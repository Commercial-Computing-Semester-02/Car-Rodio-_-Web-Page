import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';


const EmailForm = ({post}) => {

    const initialValues = {
        name: '',
        message: ''
    }

    

    function onSubmit(fields){
        const mes = "Hi! This is " + fields.name +". " + fields.message + " Thank You ! Best Regardss"
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "startupwithbois@gmail.com",
            Password : "CD4A71740227C5BE040EC1B13E9249C1463D",
            To : post.email,
            From : "startupwithbois@gmail.com",
            Subject : "Car Rodio Advertisement",
            Body : mes 
        }).then(
            message =>(
                alert(message)
            )
        );
    }


    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => {

                return (
                    <div class="baseColor text-white mt-5">
                        <Form>
                        <span class="display-4 text-center">Message Us</span>
                            <hr class="featurette-divider footer-border"/>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Name</label>
                                    <Field name="name" type="text" className='form-control' />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label>Message</label>
                                    <Field name="message" type="text" component="textarea" className='form-control' />
                                    <ErrorMessage name="message" component="div" className="invalid-feedback" />
                                </div>
                            </div>


                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btnContact" style={{backgroundColor: "black"}}>
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Send
                                </button>
                            </div>

                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default EmailForm