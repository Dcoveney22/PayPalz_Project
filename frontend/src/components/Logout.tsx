import { DoorIcon } from '../icons/DoorIcon'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'

export function Logout() {
  const { setInfo } = useContextAndErrorIfNull(UserContext)

  const onButtonClick = () => {
    setInfo(null)
  }

  return <DoorIcon id="logoutButton" onClick={onButtonClick} />
}

export default Logout
