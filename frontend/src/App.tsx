import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/App.css'
import { useState } from 'react'
import { UserContext, UserInfo } from './contexts/UserContext'
import { AuthenticationLayer } from './components/AuthenticationLayer'

function App() {
  const [info, setInfo] = useState<UserInfo | null>(null)

  const queryClient = new QueryClient()

  return (
    <UserContext.Provider value={{ info, setInfo }}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationLayer />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App
