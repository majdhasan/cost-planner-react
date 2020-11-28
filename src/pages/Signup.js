import React, { Component } from 'react'
import { FormGroup, Button, Input, FormFeedback } from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Link } from "react-router-dom"

class Signup extends Component {
    _handleFormSubmit(values) {
        console.log(values)
    }
    render() {
        return (
            <div style={{ padding: "20px" }}>
                <h3>Create your account</h3>
                <hr />
                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required(),
                        email: Yup.string().email().required(),
                        password: Yup.string().min(6).required()
                    })}
                    render={({ handleChange, handleSubmit, handleBlur, isValid, isSubmitting, errors, touched }) => (
                        <div>
                            <FormGroup>
                                <Input
                                    invalid={errors.name && touched.name}
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    onBlur={handleBlur}
                                ></Input>

                                {(errors.name && touched.name) && <FormFeedback>{errors.name}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    invalid={errors.email && touched.email}
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Your E-mail"
                                    onBlur={handleBlur}
                                ></Input>

                                {(errors.email && touched.email) && <FormFeedback>{errors.email}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    invalid={errors.password && touched.password}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Your Password"></Input>
                                {(errors.password && touched.password) && <FormFeedback>{errors.password}</FormFeedback>}
                            </FormGroup>
                            <Button disabled={!isValid || isSubmitting} onClick={handleSubmit} color="primary" block>Sign in</Button></div>
                    )}
                />
                <Link to="/login">Do you have an account? Login here</Link >
            </div>
        )
    }
}

export { Signup }