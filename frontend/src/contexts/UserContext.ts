import { Context, createContext, useContext } from 'react'

export type UserInfo = {
  username: string
  token: string
}

// this is a hook
type UserContextType = {
  info: UserInfo | null
  setInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

//typescript generics - to look up
export function useContextAndErrorIfNull<ItemType>(
  context: Context<ItemType | null>
): ItemType {
  const contextValue = useContext(context)
  if (contextValue === null) {
    throw Error('Context has not been Provided!')
  }
  return contextValue
}
