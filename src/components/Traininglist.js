import React, { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import dayjs from "dayjs"
import Customer from "./Customer"
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'


function Traininglist() {

    const [trainings, setTrainings] = useState([])
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const fetchLink = (info, linkki) => {
        console.log(`### Traininglist.js: fetching from ${info} with the link below:\n${linkki}`)
        return fetch(linkki).then(response => response.json())
    }

    useEffect(() => {
        fetchLink('useEffect', 'https://customerrest.herokuapp.com/api/trainings')
            .then(data => setTrainings(data.content))
    }, [])

    const deleteTraining = (trainingLink) => {
        if (window.confirm('Are you sure?')) {
            fetch(trainingLink, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training deleted')
                        setOpen(true)
                        fetchLink('deleteTraining', 'https://customerrest.herokuapp.com/api/trainings')
                    }
                    else {
                        alert('Failed to delete')
                    }
                })
        }
    }

    const columns = [
        {
            headerName: '',
            field: 'links',
            minWidth: 60,
            maxWidth: 60,
            cellRenderer: params => {
                console.log(`### cellRenderer Actions: ${params.data.links[0].href}`)
                return <>
                    <IconButton color="error" onClick={() => deleteTraining(params.data.links[0].href)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
        },
        { field: 'activity' },
        { field: 'duration' },
        {
            field: 'date',
            cellRenderer: (data) => {
                return dayjs(data.value).format('DD/MM/YYYY')
            }
        },
        {
            headerName: 'Time', field: 'date',
            cellRenderer: (data) => {
                return dayjs(data.value).format('HH:mm')
            }
        },
        {
            headerName: 'Name', field: 'links',
            cellRenderer: (link) => {
                return <Customer customerLink={link.data.links[2].href} />
            }
        },
        {
            headerName: 'Link to customer info', field: 'links', minWidth: 400, maxWidth: 450,
            cellRenderer: (link) => {
                return link.data.links[2].href
            }
        }
    ]

    const gridSettings = {
        defaultColDef: {
            //editable: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
            maxWidth: 150
        }
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, marginRight: 10 }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
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

export default Traininglist