import React, { useState } from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from "dayjs"
import { DateTimePicker } from "@mui/lab"


function Addtraining({ addTraining, linkki }) {

    const [open, setOpen] = useState(false)
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: linkki
    })

    const handleClickOpen = () => {
        console.log(`### Addtraining.js: Adding training with:\n${training.customer}`)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        addTraining(training)
    }

    const inputChanged = (event) => {
        // "...stateName" <- tuo edelliset arvot/propertiet 
        setTraining({ ...training, [event.target.name]: event.target.value })
    }
    /*

    */

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <AddTaskIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Select date and time"
                            value={training.date}
                            onChange={(newValue) => {
                                setTraining({ ...training, date: dayjs(newValue) });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="duration"
                        type="number"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="duration"
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

export default Addtraining