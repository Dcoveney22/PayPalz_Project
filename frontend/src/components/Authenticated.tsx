import { useState } from 'react'
import AvailableGroups from './AvailableGroups'
import GroupView from './GroupView'

export enum ViewMode {
  GroupList,
  GroupView,
}
export function Authenticated() {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GroupList)
  const [selectedGroup, setSelectedGroup] = useState<number>(1)

  if (viewMode === ViewMode.GroupList) {
    return (
      <AvailableGroups
        setSelectedGroup={setSelectedGroup}
        setViewMode={setViewMode}
      />
    )
  }

  if (viewMode === ViewMode.GroupView) {
    return <GroupView groupID={selectedGroup} setViewMode={setViewMode} />
  }
}

export default Authenticated
