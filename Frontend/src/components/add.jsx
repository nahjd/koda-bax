import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { fetchData, postData } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

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
    const data = useSelector((state) => state.counter.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    console.log(data);

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
        </>
    )
}

export default add