import React from 'react'
import { ListGroupItem, Badge } from 'reactstrap';
import moment from 'moment';

import { Spinner } from '.'


function ExpenseElement({ expense }) {
    console.log(expense
    );
    return (
        <ListGroupItem>
            <div style={{ fontSize: 20 }} className={"float-left"}>
                <span style={{ marginRight: 15 }}>{expense.description}</span>
                <Badge color="dark">
                    €{expense.amount}
                </Badge>
                <div>
                    {moment(expense.date).format("LL")}
                </div>
            </div>
            <div className={"float-right"}>
                {expense.amount}
            </div>


        </ListGroupItem>
    )
}


export { ExpenseElement }