import { Expense } from '@jacobjshelp/paypalztypes'
import { FormEvent } from 'react'
import { postExpense } from '../functions/postExpense'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'

type NewExpenseFormProps = {
  memberID: number
  groupID: number
  afterSubmit: () => void
  cancel: () => void
}

function NewExpenseForm({
  memberID,
  groupID,
  afterSubmit,
  cancel,
}: NewExpenseFormProps) {
  const amountInputName = `expenseAmountInput${memberID}`
  const descriptionInputName = `expenseDescriptionInput${memberID}`

  const { info } = useContextAndErrorIfNull(UserContext)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`expenses-${groupID}`] })
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formElements = form.elements
    const amountInput = formElements.namedItem(
      amountInputName
    ) as HTMLInputElement
    const descriptionInput = formElements.namedItem(
      descriptionInputName
    ) as HTMLInputElement
    if (amountInput.valueAsNumber && descriptionInput && info) {
      const newExpense: Expense = {
        description: descriptionInput.value,
        amount: amountInput.valueAsNumber,
        payerID: memberID,
        groupID: groupID,
      }

      mutation.mutate({ data: newExpense, token: info.token })
    }

    afterSubmit()
  }

  return (
    <form className="newExpenseForm" onSubmit={handleSubmit}>
      <input
        className="newExpenseFormInput"
        name={amountInputName}
        type="number"
        defaultValue={undefined}
        placeholder="Amount..."
      />
      <input
        className="newExpenseFormInput"
        name={descriptionInputName}
        type="text"
        defaultValue={undefined}
        placeholder="Description..."
      />
      <input
        className="submitButton formButton"
        type="submit"
        value={'Add'}
      ></input>
      <button className="cancelButton formButton" onClick={cancel}>
        Cancel
      </button>
    </form>
  )
}

export default NewExpenseForm
