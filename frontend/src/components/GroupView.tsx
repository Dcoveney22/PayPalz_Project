import { getExpenseCollection } from '../functions/getExpenseCollection'
import { GroupMember } from '@jacobjshelp/paypalztypes'
import { LeftArrowIcon } from '../icons/LeftArrowIcon'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ViewMode } from './Authenticated'

import Loader from './Loader'
import MemberView from './MemberView'
import Card from './Card'
import SumDisplay from './SumDisplay'

type MemberGridProps = {
  groupID: number
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

function GroupView({ groupID, setViewMode }: MemberGridProps) {
  const { info } = useContextAndErrorIfNull(UserContext)
  const [memberView, setMemberView] = useState(false)
  const [memberData, setMemberData] = useState<GroupMember | null>(null)

  const onProfileClicked = (memberData: GroupMember) => {
    setMemberView(true)
    setMemberData(memberData)
  }

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [`expenses-${groupID}`],
    queryFn: () => {
      if (info) return getExpenseCollection(info.token, groupID)
    },
  })

  if (isError) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <Loader />
  }

  if (data && memberView && memberData) {
    const expenses = data.expenses.filter((e) => {
      return e.payerID === memberData?.id
    })

    return (
      <MemberView
        expenses={expenses || []}
        memberData={memberData}
        groupID={data.groupID}
        groupSum={data.sum}
        groupName={data.groupName}
        setMemberView={setMemberView}
        isFetching={isFetching}
      />
    )
  }

  return (
    <>
      <LeftArrowIcon
        onClick={() => setViewMode(ViewMode.GroupList)}
        className="navigationButton"
      />

      {data && (
        <>
          <SumDisplay isFetching={isFetching} sum={data.sum} />
          <h1>{`${data.groupName}`}</h1>
          <div className="cardGrid">
            {data.groupMembers.map((m, i) => {
              return (
                <Card
                  groupID={data.groupID}
                  key={i}
                  memberData={m}
                  onProfileClicked={onProfileClicked}
                />
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default GroupView
