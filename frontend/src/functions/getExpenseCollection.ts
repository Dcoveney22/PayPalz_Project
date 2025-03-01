import { ExpenseCollection } from '@jacobjshelp/paypalztypes'

export async function getExpenseCollection(
  token: string,
  groupID: number
): Promise<ExpenseCollection> {
  const response = await fetch(`http://localhost:3000/expenses/${groupID}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(response.statusText)
  return await response.json()
}
