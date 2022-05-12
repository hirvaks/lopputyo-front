import React, {useState, useEffect} from "react"
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import dayjs from "dayjs"
import Customer from "./Customer"


function Traininglist() {

    const [trainings, setTrainings] = useState([])

    const fetchLink = (info, linkki) => {
        console.log(`### Traininglist.js: fetching from ${info} with the link below:\n${linkki}`)
        return fetch(linkki).then(response => response.json())
    }

    useEffect(() => {
        fetchLink('useEffect', 'https://customerrest.herokuapp.com/api/trainings')
        .then(data => setTrainings(data.content))
    }, [])

    const columns = [
        {field: 'activity'},
        {field: 'duration'},
        {field: 'date',
        cellRenderer: (data) => {
            return dayjs(data.value).format('DD/MM/YYYY')
        }},
        {headerName: 'Time', field: 'date',
        cellRenderer: (data) => {
            return dayjs(data.value).format('HH:mm')
        }},
        {headerName: 'Name', field: 'links',
        cellRenderer: (link) => {
            return <Customer customerLink={link.data.links[2].href} />
        }},
        {headerName: 'Link to customer info', field: 'links', minWidth: 400, maxWidth: 450,
        cellRenderer: (link) => {
            return link.data.links[2].href
        }} 
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

    return(
        <>
        <div className="ag-theme-material" style={{height: 600, marginRight: 10}}>
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
        </>
    )
}

export default Traininglist