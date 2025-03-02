import { useState } from 'react'
import NewExpenseForm from './NewExpenseForm'
import Button from './Button'

type AddExpenseButtonProps = {
  memberID: number
  groupID: number
}

function AddExpenseButton({ memberID, groupID }: AddExpenseButtonProps) {
  const [showInput, setShowInput] = useState(false)

  const handleOnClick = () => {
    setShowInput(true)
  }

  const hideForm = () => {
    setShowInput(false)
  }

  return (
    <>
      {showInput ? (
        <NewExpenseForm
          memberID={memberID}
          groupID={groupID}
          afterSubmit={hideForm}
          cancel={hideForm}
        />
      ) : (
        <Button
          onClick={handleOnClick}
          text={'Add expense'}
          classes="addExpenseButton"
        />
      )}
    </>
  )
}

export default AddExpenseButton
