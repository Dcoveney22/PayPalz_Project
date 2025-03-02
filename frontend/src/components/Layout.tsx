import { Logout } from './Logout'
import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layoutContainer">
      <Logout />
      <div className="bigSpace"></div>
      {children}
    </div>
  )
}
