import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';

import { Spinner, ExpenseElement } from './'


function ExpenseListComponent({ expenses, fetching }) {

    return (
        <div>
            {fetching && <Spinner />}

            <ListGroup>
                {expenses &&
                    expenses.map(expense => {
                        return (
                            <ExpenseElement key={expense._id} expense={expense} />
                        )
                    })}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = ({ expense }) => {
    return {
        expenses: expense.expenses,
        fetching: expense.fetching
    };
};

const ExpenseList = connect(mapStateToProps)(ExpenseListComponent)

export { ExpenseList }