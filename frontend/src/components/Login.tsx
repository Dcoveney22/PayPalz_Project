import { useState } from 'react'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import { login } from '../functions/login'
import Button from './Button'

export function Login() {
  const [username, setUsername] = useState('user-Jayden') // Hardcoded while developing
  const [password, setPassword] = useState('user-Jayden') // Hardcoded while developing
  const { setInfo } = useContextAndErrorIfNull(UserContext)

  const onButtonClick = () => {
    login({ username: username, password: password }, setInfo)
  }

  return (
    <div className="centerContainer">
      <div className={'mainContainer'}>
        <h1>Login</h1>
        <form>
          <input
            className="loginInput"
            value={username}
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            className="loginInput"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Button onClick={onButtonClick} text="Go!" classes="loginButton" />
        </form>
      </div>
    </div>
  )
}

export default Login
