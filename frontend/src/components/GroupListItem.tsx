type GroupListItemProps = {
    name: string
    onClick: () => void
  }
  
  function GroupListItem({ name, onClick }: GroupListItemProps) {
    return (
      <p className="groupListItem" onClick={onClick}>
        {name}
      </p>
    )
  }
  
  export default GroupListItem