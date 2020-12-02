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
        try {
            this.bag = bag
            this.props.saveExpense(values);
            bag.setSubmitting(false)
            if (this.props.errorMessage === null) {
                this.toggle()
                bag.resetForm()
                this.props.fetchExpenses();
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidUpdate() {
        const { saved, errorMessage } = this.props;
        if (saved) {
            setTimeout(() => {
                this.props.resetExpenseState()
            }, 3000);
        }
        if (errorMessage) {
            setTimeout(() => {
                this.props.clearErrors()
            }, 3000);
        }
    }


    render() {
        const now = moment().format('YYYY-MM-DD')
        return (
            <div>
                {this.props.saved && <Alert color="success">Expense was successfully created!</Alert>}
                <ErrorMessage />
                <FloatingButton onClick={this.toggle} content={<i className="fa fa-plus"></i>}></FloatingButton>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
                    <ModalBody>

                        <Formik>
                            <Formik
                                initialValues={{ amount: 0, create: now, description: "" }}
                                onSubmit={this._onSubmit.bind(this)}
                                validationSchema={Yup.object().shape({
                                    amount: Yup.number().min(1).required(),
                                    create: Yup.date().required()
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
                                            <Label for="create">Date</Label>
                                            <Input
                                                invalid={errors.create && touched.create}
                                                name="create"
                                                value={values.create}
                                                type="date"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Date"
                                            />
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