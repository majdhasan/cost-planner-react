import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, FormFeedback } from 'reactstrap';
import moment from 'moment'

import { FloatingButton } from '../components'


class AddFormComponent extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);

        this.state = {
            modal: false,
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    _onSubmit(values, bag) {
        console.log(values);
        console.log(bag);
        bag.setSubmitting(false)
        this.toggle()
    }

    render() {
        const now = moment().format('YYYY-MM-DD')
        console.log(now);
        return (
            <div>
                <FloatingButton onClick={this.toggle} content={<i className="fa fa-plus"></i>}></FloatingButton>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
                    <ModalBody>
                        <Formik>
                            <Formik
                                initialValues={{ amount: 0, create: now }}
                                onSubmit={this._onSubmit.bind(this)}
                                // onSubmit={this._handleFormSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    amount: Yup.number().min(1).required(),
                                    create: Yup.date().required()
                                })}
                                render={({ handleChange, handleSubmit, handleBlur, values, isValid, isSubmitting, errors, touched }) => (
                                    <div>
                                        <FormGroup>
                                            <Input
                                                invalid={errors.amount && touched.amount}
                                                name="amount"
                                                type="number"
                                                value={values.amount}
                                                onChange={handleChange}
                                                placeholder="Expense amount"
                                                onBlur={handleBlur}
                                            ></Input>

                                            {(errors.amount && touched.amount) && <FormFeedback>{errors.amount}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                invalid={errors.create && touched.create}
                                                name="create"
                                                value={values.create}
                                                type="date"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Date"></Input>
                                            {(errors.create && touched.create) && <FormFeedback>{errors.create}</FormFeedback>}
                                        </FormGroup>
                                        <Button onClick={handleSubmit} color="primary"
                                            disabled={!isValid || isSubmitting}
                                        >Add</Button>
                                    </div>
                                )}
                            />
                        </Formik>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {

    };
};
const AddForm = connect(mapStateToProps)(AddFormComponent)
export { AddForm }