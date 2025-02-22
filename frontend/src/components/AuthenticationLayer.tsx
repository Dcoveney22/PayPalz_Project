import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import AvailableGroups from './AvailableGroups'
import Login from './Login'

export function AuthenticationLayer() {
  const { info } = useContextAndErrorIfNull(UserContext)

  if (info) return <AvailableGroups />
  return <Login />
}
