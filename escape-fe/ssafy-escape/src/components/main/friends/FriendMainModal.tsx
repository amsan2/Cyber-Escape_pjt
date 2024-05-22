import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import getFriendList from "@/services/main/friends/getFriendList"
import useModalStore from "@/stores/ModalStore"
import FriendRequestModal from "@/components/main/friends/FriendRequestModal"
import FriendList from "@/components/main/friends/FriendList"
import MainModal from "@/components/common/MainModal"
import FriendRequestActions from "./FriendRequestList"
import FriendContext from "@/context/FriendContext"

// 친구 메인 모달
const FriendMainModal = ({ isOpen, onClose }: ModalProps) => {
  const { isRequestModalOpen, setIsRequestModalOpen, setIsDeleteMode } =
    useModalStore()

  // 친구 요청 모달 닫기
  const handleRequestModalClose = () => {
    setIsRequestModalOpen(false)
  }

  // 친구 목록 조회 refetch
  const { refetch: refetchFriends } = useInfiniteQuery({
    queryKey: ["friendList"],
    queryFn: ({ pageParam }) => getFriendList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  useEffect(() => {
    refetchFriends()
    setIsDeleteMode(false)
  }, [])

  return (
    <FriendContext.Provider value={{ refetchFriends }}>
      <MainModal
        isOpen={isOpen}
        onClose={onClose}
        text="친구 목록"
        isFriendModal={true} /* 친구 모달이므로 true 필수! */
      >
        <FriendRequestActions />
        <hr />
        <FriendList />
        <FriendRequestModal
          isOpen={isRequestModalOpen}
          onClose={handleRequestModalClose}
        />
      </MainModal>
    </FriendContext.Provider>
  )
}

export default FriendMainModal
