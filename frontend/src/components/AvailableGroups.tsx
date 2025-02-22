import { getGroupsForMember } from '../functions/getGroupsForMember'
import { Group } from '@jacobjshelp/paypalztypes'
import { useQuery } from '@tanstack/react-query'
import GroupListItem from './GroupListItem'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'

function AvailableGroups() {
  const { info } = useContextAndErrorIfNull(UserContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: () => {
      if (info) return getGroupsForMember(info.username)
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
      <h1>Your groups</h1>
      {data.map((g: Group) => {
        return (
          <GroupListItem
            key={g.id}
            name={g.name}
            onClick={() => {
              console.log(`Clicked on group ${g.name}`)
            }}
          />
        )
      })}
    </>
  )
}

export default AvailableGroups
