import React, { Component } from 'react'
import { FormGroup, Button, Input, FormFeedback } from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { signIn } from '../actions'

class LoginPage extends Component {
    
    _handleFormSubmit(values) {
        this.props.signIn(values)
    }
    render() {
        return (
            <div style={{ padding: "20px" }}>
                <h3>Login to your account</h3>
                <hr />
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().min(6).required("this field is required")
                    })}
                    render={({ handleChange, handleSubmit, handleBlur, isValid, isSubmit, errors, touched }) => (
                        <div>
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
                            <Button onClick={handleSubmit} color="primary" block>Sign in</Button></div>
                    )}
                />
                <Link to="/signup">No account? Sign up here</Link >
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        attempting: auth.attempting,
        error: auth.error
    };
};

const Login = connect(mapStateToProps, { signIn })(LoginPage)

export { Login }