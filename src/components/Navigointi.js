import React from 'react'
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'

const Navigointi = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    LOPPUTYO
                </Typography>

                <Stack direction='row' spacing={2}>
                    <Button variant="contained" component="span"><Link to="/">Home</Link></Button>
                    <Button variant="contained" component="span"><Link to="/customerlist">Customers</Link></Button>
                    <Button variant="contained" component="span"><Link to="/traininglist">Trainings</Link></Button>
                </Stack>
                
            </Toolbar>
        </AppBar>
    )
}

export default Navigointi