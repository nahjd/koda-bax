import React, { useEffect } from 'react'
import { addBasket, fetchData, addWishlist } from '../redux/slice/userSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Helmet } from "react-helmet";

const Home = () => {
    const data = useSelector((state) => state.counter.data)
    const wishlist = useSelector((state) => state.counter.wishlist)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])
    console.log(data);

    return (
        <>
            {data && data.map((item) => {
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>ahah</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={item.image}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                salam
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                dispatch(addBasket(item))
                            }} variant="contained">Basket</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                )
            })}

        </>
    )
}

export default Home