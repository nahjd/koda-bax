import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { deletedData, fetchData, postData } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

const add = () => {
    const [search, setSearch] = useState("")
    const [type, settype] = useState("")
    const data = useSelector((state) => state.counter.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    console.log(data);

    const searchData = () => {
        if (type == "az") {
            return [...data].sort((a, b) => a.name.localCompare(b.name))

        } else if (type = "za") {
            return [...data.sort].sort((a, b) => a.name.localCompare(a.name))
        } else {
            return [...data].sort((a, b) => a.price - b.price)
        }
        return data

    }

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    image: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    console.log(values);
                    dispatch(postData(values))

                }}
            >
                {({ errors, touched, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field name="name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null} <br />
                        <Field name="image" />
                        {errors.image && touched.image ? (
                            <div>{errors.image}</div>
                        ) : null} <br />
                        <Button type="submit" variant="contained" >ADD</Button>
                    </Form>
                )}
            </Formik>
            <div className="searc">
                <TextField onChange={(e) => {
                    setSearch(e.target.value)
                }} placeholder='search' id="outlined-basic" label="Outlined" variant="outlined" />
                <Button onClick={() => {
                    settype("az")
                }} type="submit" variant="contained" >A-Z</Button>
                <Button onClick={() => {
                    settype("za")
                }} type="submit" variant="contained" >Z-A</Button>
                <Button onClick={() => {
                    settype("")
                }} type="submit" variant="contained" >Price</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {searchData().filter((item) => {
                            item.name.toLowerCase().includes(search.toLowerCase())
                        }).map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                              
                                <TableCell align="right">{row.image}</TableCell>

                                <TableCell align="right">
                                    <Button onClick={() => {
                                        dispatch(deletedData(row._id))
                                    }} variant="outlined" color="error" >Delete</Button>
                                </TableCell>
                            </TableRow>



                        ))}
                    </TableBody> */}

                    <TableBody>
                        {data && data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                <TableCell align="right">{row.image}</TableCell>

                                <TableCell align="right">
                                    <Button onClick={() => {
                                        dispatch(deletedData(row._id))
                                    }} variant="outlined" color="error" >Delete</Button>
                                </TableCell>
                            </TableRow>



                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}

export default add