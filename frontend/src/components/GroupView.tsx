import { getExpenseCollection } from '../functions/getExpenseCollection'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { ViewMode } from './Authenticated'
import Card from './Card'

type MemberGridProps = {
  groupID: number
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

function GroupView({ groupID, setViewMode }: MemberGridProps) {
  const { info } = useContextAndErrorIfNull(UserContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: [`expenses-${groupID}`],
    queryFn: () => {
      if (info) return getExpenseCollection(info.token, groupID)
    },
  })

  if (isError) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {data && (
        <>
          <h1>{data.sum}</h1>
          <h1>{`${data.groupName}`}</h1>
          <div className="cardGrid">
            {data.groupMembers.map((m, i) => {
              return <Card groupID={data.groupID} key={i} memberData={m} />
            })}
          </div>
        </>
      )}
    </>
  )
}

export default GroupView
