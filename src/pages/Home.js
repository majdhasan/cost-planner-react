import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FloatingButton, AddForm, ExpenseList } from '../components'

import { fetchExpenses } from '../actions'



class HomeComponent extends Component {


    componentDidMount() {
        const { fetchExpenses } = this.props;
        fetchExpenses()
    }

    _renderExpenses() {
        const { expenses } = this.props
        console.log(expenses);
        expenses.map(expense => {
            return (
                <div>HII </div>
            )
        })
    }


    render() {
        const { expenses } = this.props
        return (
            <div>
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
