import React, {useState, useEffect} from "react"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import Addcustomer from "./Addcustomer"
import Editcustomer from "./Editcustomer"

function Customerlist() {

    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
//----------
    const deleteCustomer = (customerLink) => {
        if (window.confirm('Are you sure?')) {
            fetch(customerLink, {method:'DELETE'})
            .then(response => {
                if (response.ok) {
                    setMsg('Customer deleted')
                    setOpen(true)
                    fetchCustomers()
                }
                else {
                    alert('failed to delete')
                }
            })
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                console.log('### asiakas lisätty')
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
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if(response.ok) {
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
// ----------

    const columns = [
        {field: 'firstname'},
        {field: 'lastname'},
        {field: 'streetaddress', minWidth: 150},
        {field: 'postcode'},
        {field: 'city'},
        {field: 'email'},
        {field: 'phone'},
// ---------        
        {headerName: '',
        maxWidth: 80,
            field: 'links',
            cellRenderer: params => {
                console.log(`### cellRenderer EDIT: ${params.data.links[0].href}`)
            return <Editcustomer updateCustomer={updateCustomer} params={params} linkki={params.data.links[0].href}/>}},
        {headerName: '',
        minWidth: 100,
        maxWidth: 100,
        field: 'links',
        cellRenderer: link => {
            console.log(`### cellRenderer DELETE: ${link.data.links[0].href}`)
        return <IconButton color="error" onClick={() => deleteCustomer(link.data.links[0].href)}>
            <DeleteIcon/>
        </IconButton>}}
// ---------        
    ]

    const gridSettings = {
        defaultColDef: {
          //editable: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          maxWidth: 180
        }
    }

    return(
        <>
            <Addcustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{height: 600, marginRight: 10}}>
                <AgGridReact
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