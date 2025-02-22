import { UserInfo } from '../contexts/UserContext'

type LoginInfo = {
  username: string
  password: string
}

export async function login(
  loginInfo: LoginInfo,
  setInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
) {
  const response = await fetch('http://localhost:3000/authenticate', {
    method: 'POST',
    body: JSON.stringify({
      username: loginInfo.username,
      password: loginInfo.password,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()

  if (response.status !== 200) {
    console.log(data.message)
  } else {
    setInfo({ username: loginInfo.username, token: data.token })
  }
}
