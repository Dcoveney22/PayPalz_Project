import { GroupMember } from '@jacobjshelp/paypalztypes'
import AddExpenseButton from './AddExpenseButton'

type CardProps = {
  memberData: GroupMember
  groupID: number
  onProfileClicked?: (memberData: GroupMember) => void
}

export default function Card({
  memberData,
  groupID,
  onProfileClicked,
}: CardProps) {
  const sumColor = memberData.value < 0 ? 'var(--pp-red)' : 'var(--pp-green)'

  const onImageClicked = () => {
    if (onProfileClicked) onProfileClicked(memberData)
  }

  return (
    <div className="card">
      <img
        className="profilePhoto"
        src={`person${memberData.id}.jpg`}
        alt=""
        onClick={onImageClicked}
      />
      <div>
        <span className="label nameLabel">{memberData.name}</span>
        <span
          className="label sumLabel"
          style={{ color: sumColor }}
        >{`${memberData.value.toFixed(2)}$`}</span>
      </div>
      <AddExpenseButton memberID={memberData.id} groupID={groupID} />
    </div>
  )
}
