import React, { useState, useEffect, useRef, useCallback } from "react"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import Addcustomer from "./Addcustomer"
import Editcustomer from "./Editcustomer"
import { Stack } from '@mui/material'
import Addtraining from "./Addtraining"

function Customerlist() {

    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const gridRef = useRef();
    const csvExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const deleteCustomer = (customerLink) => {
        if (window.confirm('Are you sure?')) {
            fetch(customerLink, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer deleted')
                        setOpen(true)
                        fetchCustomers()
                    }
                    else {
                        alert('Failed to delete')
                    }
                })
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer added')
                    setOpen(true)
                    fetchCustomers()
                }
                else {
                    alert('Something went wrong when adding customer')
                }
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer edited')
                    setOpen(true)
                    fetchCustomers()
                }
                else {
                    alert('Something went wrong when editing')
                }
            })
            .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    console.log('### training lisätty:')
                    console.log(training)
                    setMsg('Training added')
                    setOpen(true)
                    fetchCustomers()
                }
                else {
                    alert('Something went wrong when adding training')
                }
            })
            .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: 'Actions',
            field: 'links',
            minWidth: 170,
            maxWidth: 170,
            cellRenderer: params => {
                console.log(`### cellRenderer Actions: ${params.data.links[0].href}`)
                return <>
                    <Stack direction='row' spacing={1}>
                        <Addtraining addTraining={addTraining} linkki={params.data.links[0].href} />
                        <Editcustomer updateCustomer={updateCustomer} params={params} linkki={params.data.links[0].href} />
                        <IconButton color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </>
            }
        },
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress', minWidth: 150 },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' }

    ]

    const gridSettings = {
        defaultColDef: {
            editable: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
        }
    }

    return (
        <>
            <Stack direction='row' spacing={1}>
                <Addcustomer addCustomer={addCustomer} />
                <Button variant="outlined" onClick={csvExport}>Download CSV</Button>
            </Stack>
            <div className="ag-theme-material" style={{ height: 600, marginRight: 10 }}>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                    //suppressCellFocus={true}
                    gridOptions={gridSettings}
                    enableRangeSelection={true}
                    rowSelection={'single'}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default Customerlist