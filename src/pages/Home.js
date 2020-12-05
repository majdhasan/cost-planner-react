import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddForm, ExpenseList, MonthSelector } from '../components'

import { fetchExpenses } from '../actions'
class HomeComponent extends Component {


    componentDidMount() {
        const { fetchExpenses } = this.props;
        fetchExpenses()
    }

    render() {

        return (
            <div>
                <MonthSelector selected={new Date().getMonth()} />
                <h3 style={{ marginTop: 30 }} >Expenses</h3>
                <hr />
                <ExpenseList />
                <AddForm />
            </div>
        )
    }
}

const mapStateToProps = ({ expense }) => {
    return {
        expenses: expense.expenses
    };
};

const Home = connect(mapStateToProps, { fetchExpenses })(HomeComponent)

export { Home }
