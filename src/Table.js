import React, { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { Grid, Card, CardHeader, Button, Stack, Dialog, DialogActions, Typography, TextField, DialogContentText, DialogContent } from '@mui/material'
import { getData, postData } from './Services/NodeServices';




const Table = () => {
    const [data, setData] = useState([])
    const [addEditData, setAddEditData] = useState(false)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [id, setId] = useState('')
    const [count, setCount] = useState()
    const [action, setAction] = useState('Add')

    const fetchAllData = async () => {
        const result = await getData('users/displayalldata')  // api for fetching all data execution time 40 ms
        setData(result?.data)
    }

    useEffect(() => {
        fetchAllData()
        fetchCount()
    }, [])

    const fetchCount = async () => {
        const result = await getData('users/displayApiCount')  // api for fetching all data execution time 40 ms
        setCount(result?.data)
    }

    const handleClose = () => {
        setAddEditData(false)
        setName('')
        setAge('')
        setId('')
        setAction('Add')
    }

    const handleSave = async () => {


        if (action === 'Add') {
            let body = { name: name, age: age }
            const response = await postData('users/add', body)  // api for add data execution time 112 ms
            if (response.status === true) {
                fetchAllData()
                fetchCount()
                handleClose()

            }
        }
        else {
            let body1 = { _id: id, name: name, age: age }
            const response = await postData('users/update', body1) // api for fetching all data execution time 90 ms
            if (response.status === true) {
                fetchAllData()
                fetchCount()
                handleClose()
            }
        }
    }


    const AddEditData = () => {
        return (
            <Dialog open={addEditData} onClose={handleClose} fullWidth sx={{ width: "100%" }}>
                <CardHeader
                    title={`${action} Data`}
                    sx={{ backgroundColor: "#001e3c", color: "white" }}
                />
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ m: 1 }}>
                                <TextField value={name} label="Name" onChange={(e) => setName(e.target.value)} fullWidth />
                            </Grid>
                            <Grid item xs={12} sx={{ m: 1 }}>
                                <TextField value={age} label="Age" type='number' onChange={(e) => setAge(e.target.value)} fullWidth />
                            </Grid>
                            {action === "Add" ?
                                <Grid item xs={12} sx={{ textAlign: "center" }}>
                                    <Button variant='contained' disabled={(name === '' || age === '')} onClick={() => handleSave()}>Save</Button>
                                </Grid>
                                :
                                <Grid item xs={12} sx={{ textAlign: "center" }}>
                                    <Button variant='contained' disabled={(name === '' || age === '')} onClick={() => handleSave()}>Update</Button>
                                </Grid>}
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    const handleOpen = (data) => {
        setAction("Edit")
        setName(data?.name)
        setAge(data?.age)
        setId(data?._id)
        setAddEditData(true)
    }

    return (
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <Grid item xs={8}>
                <Card>
                    <CardHeader
                        title="Data"
                        sx={{ backgroundColor: "#001e3c", color: "white" }}
                        action={
                            <Button variant='contained' onClick={() => setAddEditData(true)}>
                                Add Data
                            </Button>
                        } />
                    <Stack>
                        <MaterialTable
                            title=""
                            data={data}
                            columns={[
                                {
                                    title: "Name",
                                    field: "name",
                                },
                                {
                                    title: "Age",
                                    field: "age",
                                },
                                {
                                    title: "Action",
                                    render: (rowData) => (
                                        <Stack direction='row' spacing={2}>
                                            <Button variant="contained" onClick={() => handleOpen(rowData)} >
                                                Update
                                            </Button>
                                        </Stack>
                                    ),
                                },
                            ]}
                        />

                    </Stack>


                </Card>

                <Stack justifyContent='center' alignItems='center' sx={{ mt: 4 }} spacing={2}>
                    <Typography>Api Counts</Typography>
                    <Typography>Add Count:{count?.addCount}</Typography>
                    <Typography>Update Count:{count?.updateCount}</Typography>
                </Stack>
            </Grid>

            {AddEditData()}
        </Grid>
    )
}

export default Table


