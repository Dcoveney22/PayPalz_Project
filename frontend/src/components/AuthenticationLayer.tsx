import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import Authenticated from './Authenticated'
import Login from './Login'

export function AuthenticationLayer() {
  const { info } = useContextAndErrorIfNull(UserContext)

  if (info) return <Authenticated />
  return <Login />
}
