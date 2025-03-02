import { Expense } from '@jacobjshelp/paypalztypes'

type ExpenseTableProps = {
  expenses: Expense[]
}

function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e, i) => {
          return (
            <tr key={i}>
              <td>{e.description}</td>
              <td>{e.amount}$</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ExpenseTable
