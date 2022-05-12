import React, { useState } from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'


function Editcustomer({ updateCustomer, params, linkki }){
    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true)
        setCustomer({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone
        })
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        updateCustomer(customer, linkki)
    }

    const inputChanged = (event) => {
        // "...stateName" <- tuo edelliset arvot/propertiet 
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <div>
        <IconButton color="secondary" onClick={handleClickOpen}>
            <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
            <TextField
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                margin="dense"
                label="firstname"
                fullWidth
                variant="standard"
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                margin="dense"
                label="lastname"
                fullWidth
                variant="standard"
            />
            <TextField
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                margin="dense"
                label="streetaddress"
                fullWidth
                variant="standard"
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                margin="dense"
                label="postcode"
                fullWidth
                variant="standard"
            />
            <TextField
                name="city"
                value={customer.city}
                onChange={inputChanged}
                margin="dense"
                label="city"
                fullWidth
                variant="standard"
            />
            <TextField
                name="email"
                value={customer.email}
                onChange={inputChanged}
                margin="dense"
                label="email"
                fullWidth
                variant="standard"
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                margin="dense"
                label="phone"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default Editcustomer