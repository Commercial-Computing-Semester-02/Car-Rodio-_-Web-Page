import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom"
import { postService } from '../../Backend Services/PostService';

function PostForm({ uid }) {

    let history = useHistory()
    const isAddMode = uid == 0 ? true : false

    const {brands} = postService.GetBrands()

    const initialValues = {
        title: '',
        description: '',
        price: '',

        model: '',
        colour: '',
        year: '',
        fuel: 'Petrol',
        miles: '',
        conditions: 'Used',
        transmission: 'Auto',
        brand: 'Other',

        region: '',
        city: '',
        address: '',

        name: '',
        contact: '',
        email: '',
        file: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        price: Yup.string()
            .required('Price is required'),
        model: Yup.string()
            .required('Model is required'),
        year: Yup.string()
            .required('Year is required'),
        colour: Yup.string()
            .required('Colour is required'),
        fuel: Yup.string()
            .required('Fuel is required'),
        miles: Yup.string()
            .required('Miles is required'),
        conditions: Yup.string()
            .required('Condition is required'),
        transmission: Yup.string()
            .required('Transmission is required'),
        brand: Yup.string()
            .required('Brand is required'),
        region: Yup.string()
            .required('Region is required'),
        city: Yup.string()
            .required('City is required'),
        address: Yup.string()
            .required('Address is required'),
        name: Yup.string()
            .required('Name is required'),
        contact: Yup.string()
            .required('contact is required'),
        email: Yup.string()
            .required('Email is required'),
    });
    

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus()
        if (isAddMode) {
            createPost(fields, setSubmitting)
        }
    }

    function createPost(fields, setSubmitting) {  
        postService.CreatePost(fields)
            .then(function(response){
                for (let i = 0; i < fields.file.length; i++) {
                    let form_data = new FormData()
                    form_data.append('image', fields.file[i])
                    postService.SendImages(response.data.data.addedId, form_data)
                }
            })
            .then(response =>{
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: "Successfully Posted Your advertisement !. We'll get back to you soon",
                    showConfirmButton: false,
                    timer: 2500
                }).then(function () {
                    window.location = "/services";
                })
            })
            .catch(error => {
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: error.response.data,
                    showConfirmButton: false,
                    timer: 2500
                }).then(function () {
                    window.location = "/services";
                })
            })
    }


    const formikRef = useRef()

    useEffect(() => {
        if (!isAddMode) {
            postService.GetPostForForm(uid)
                .then(function(response){
                    const post = response.data.data
                    const fields = ['title', 'price', 'description', 'model', 'colour', 'year', 'fuel', 'miles', 'conditions', 'transmission', 'region', 'city', 'address', 'name', 'contact', 'email']
                    fields.forEach(field => formikRef.current.setFieldValue(field, post[field], false))
                })
        }
    }, [])


    return (
        <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {

                return (
                    <div class="contact-form">
                        <Form>
                            <h3>{isAddMode ? 'Add Post' : 'View Post'}</h3>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Title</label>
                                    <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Description</label>
                                    <Field name="description" type="text" component="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Price</label>
                                    <Field name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                    <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Model</label>
                                    <Field name="model" type="text" className={'form-control' + (errors.model && touched.model ? ' is-invalid' : '')} />
                                    <ErrorMessage name="model" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Colour</label>
                                    <Field name="colour" type="text" className={'form-control' + (errors.colour && touched.colour ? ' is-invalid' : '')} />
                                    <ErrorMessage name="colour" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Year</label>
                                    <Field name="year" type="text" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} />
                                    <ErrorMessage name="year" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Fuel</label>
                                    <Field name="fuel" as="select" className={'form-control' + (errors.fuel && touched.fuel ? ' is-invalid' : '')} >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </Field>
                                    <ErrorMessage name="fuel" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Miles</label>
                                    <Field name="miles" type="text" className={'form-control' + (errors.miles && touched.miles ? ' is-invalid' : '')} />
                                    <ErrorMessage name="miles" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Condition</label>
                                    <Field name="conditions" as="select" className={'form-control' + (errors.conditions && touched.conditions ? ' is-invalid' : '')} >
                                        <option value="Used">Used</option>
                                        <option value="Brand">Brand New</option>
                                    </Field>
                                    <ErrorMessage name="conditions" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Transmission</label>
                                    <Field name="transmission" as="select" className={'form-control' + (errors.transmission && touched.transmission ? ' is-invalid' : '')} >
                                        <option value="Auto">Auto</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Electric">Both</option>
                                    </Field>
                                    <ErrorMessage name="transmission" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-12">
                                <label>Brand</label>
                                    <Field name="brand" as="select" className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')}>
                                        {brands.map((item, index) => {
                                            return(
                                                <option value={item.name}>{item.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <ErrorMessage name="brand" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label>Region</label>
                                    <Field name="region" type="text" className={'form-control' + (errors.region && touched.region ? ' is-invalid' : '')} />
                                    <ErrorMessage name="region" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group col-6">
                                    <label>City</label>
                                    <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Address</label>
                                    <Field name="address" type="text" component="textarea" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                </div>
                            </div>

                            {isAddMode && <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Images(Max Up-to 5 Images,Please note; 1 Front,Back, Sides & Interrior)</label>
                                    <input id="file" name="file" className="form-control" type="file" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files);
                                    }} multiple/>
                                </div>
                            </div>}
                        

                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label>Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>

                                <div className="form-group col-6">
                                    <label>Contact Number</label>
                                    <Field name="contact" type="text" className={'form-control' + (errors.contact && touched.contact ? ' is-invalid' : '')} />
                                    <ErrorMessage name="contact" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-row">

                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>

                            </div>

                            <div className="form-group">
                                {isAddMode && <button type="submit" disabled={isSubmitting} className="btnContact">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>}
                            </div>

                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default PostForm