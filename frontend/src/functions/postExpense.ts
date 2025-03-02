import { Expense } from '@jacobjshelp/paypalztypes'

export async function postExpense(input: { data: Expense; token: string }) {
  const { data, token } = input
  const response = await fetch('http://localhost:3000/expense', {
    method: 'POST',
    body: JSON.stringify({
      amount: data.amount,
      description: data.description,
      payerID: data.payerID,
      groupID: data.groupID,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.status)
}
