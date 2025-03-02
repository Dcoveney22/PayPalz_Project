import { Expense, GroupMember } from '@jacobjshelp/paypalztypes'
import { LeftArrowIcon } from '../icons/LeftArrowIcon'
import Card from './Card'
import ExpenseTable from './ExpenseTable'
import SumDisplay from './SumDisplay'

type MemberViewProps = {
  memberData: GroupMember
  expenses: Expense[]
  groupID: number
  groupSum: number
  groupName: string
  setMemberView: React.Dispatch<React.SetStateAction<boolean>>
  isFetching: boolean
}

function MemberView({
  memberData,
  expenses,
  groupID,
  groupSum,
  groupName,
  setMemberView,
  isFetching,
}: MemberViewProps) {
  return (
    <>
      <LeftArrowIcon
        onClick={() => setMemberView(false)}
        className="navigationButton"
      />
      <SumDisplay sum={groupSum} isFetching={isFetching} />
      <h1>{`${groupName}`}</h1>
      <Card memberData={memberData} groupID={groupID} />
      {expenses?.length > 0 ? (
        <ExpenseTable expenses={expenses} />
      ) : (
        <>
          <div className="smallSpace" />
          <span>No expenses have been made</span>
        </>
      )}
    </>
  )
}

export default MemberView
