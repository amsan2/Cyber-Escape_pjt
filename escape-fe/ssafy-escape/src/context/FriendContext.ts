import { createContext, useContext } from "react"

interface FriendContextProps {
  refetchFriends: () => void
}

const FriendContext = createContext<FriendContextProps>({
  refetchFriends: () => {},
})

export const useFriendContext = () => useContext(FriendContext)

export default FriendContext
