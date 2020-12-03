import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, FormFeedback, Label, Alert } from 'reactstrap';
import moment from 'moment'

import { saveExpense, resetExpenseState, clearErrors, fetchExpenses } from '../actions/'
import { FloatingButton, ErrorMessage } from '../components'



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
        const { saveExpense, fetchExpenses, errorMessage } = this.props
        try {
            this.bag = bag
            saveExpense(values);
            bag.setSubmitting(false)
            if (errorMessage === null) {
                this.toggle()
                bag.resetForm()
                fetchExpenses();
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidUpdate() {
        const { saved, errorMessage, resetExpenseState, clearErrors, fetchExpenses } = this.props;
        if (saved) {
            fetchExpenses()
            setTimeout(() => {
                resetExpenseState()
            }, 3000);
        }
        if (errorMessage) {
            setTimeout(() => {
                clearErrors()
            }, 3000);
        }
    }


    render() {
        const now = moment().format('YYYY-MM-DD')
        return (
            <div>
                <ErrorMessage />
                <FloatingButton onClick={this.toggle} content={<i className="fa fa-plus"></i>}></FloatingButton>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
                    <ModalBody>

                        <Formik>
                            <Formik
                                initialValues={{ amount: 0, date: now, description: "" }}
                                onSubmit={this._onSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    amount: Yup.number().min(1).required(),
                                    date: Yup.date().required()
                                })}
                                render={({ handleChange, handleSubmit, handleBlur, values, isValid, isSubmitting, errors, touched }) => (
                                    <div>
                                        <FormGroup>
                                            <Label for="amount">Amount</Label>
                                            <Input
                                                invalid={errors.amount && touched.amount}
                                                name="amount"
                                                type="number"
                                                value={values.amount}
                                                onChange={handleChange}
                                                placeholder="Expense amount"
                                                onBlur={handleBlur}
                                            />
                                            {(errors.amount && touched.amount) && <FormFeedback>{errors.amount}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input
                                                invalid={errors.description && touched.description}
                                                name="description"
                                                type="textarea"
                                                value={values.description}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                onBlur={handleBlur}
                                            />
                                            {(errors.amount && touched.amount) && <FormFeedback>{errors.amount}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="date">Date</Label>
                                            <Input
                                                invalid={errors.date && touched.date}
                                                name="date"
                                                value={values.date}
                                                type="date"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Date"
                                            />
                                            {(errors.date && touched.date) && <FormFeedback>{errors.date}</FormFeedback>}
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
            </div >
        )
    }
}

const mapStateToProps = ({ expense, error }) => {
    return {
        saved: expense.saved,
        errorMessage: error.message
    };
};
const AddForm = connect(mapStateToProps, { saveExpense, resetExpenseState, clearErrors, fetchExpenses })(AddFormComponent)
export { AddForm }