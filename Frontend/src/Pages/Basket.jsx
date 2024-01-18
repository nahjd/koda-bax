import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchData, decreaseBasket, increaseBasket, deleteBasket } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";

const Basket = () => {
    const basket = useSelector((state) => state.counter.basket);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <div>
            <h1>Sagol</h1>
            <TableContainer component={Paper}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Lannnn</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Images</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket && basket.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.image}</TableCell>
                                <TableCell align="right">
                                    {Number(row.price) * row.quantity}
                                </TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        dispatch(increaseBasket(row))
                                    }}

                                    >
                                        Increase
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        dispatch(decreaseBasket(row))
                                    }}

                                    >
                                        Decrease
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        dispatch(deleteBasket(row._id))
                                    }}

                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div >
    )
}

export default Basket