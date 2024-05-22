import { useInfiniteQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import useModalStore from "@/stores/ModalStore"
import getFriendList from "@/services/main/friends/getFriendList"
import postDeleteFriend from "@/services/main/friends/postDeleteFriend"
import FriendItem from "./FriendItem"
import ALERT_MESSAGES from "@/constants/alertMessages"
import InfiniteQuery from "@/hooks/InfiniteQuery"

// 친구 목록 (무한 스크롤)
const FriendList = () => {
  const { isDeleteMode } = useModalStore()
  const {
    data: friendsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchFriends,
  } = useInfiniteQuery({
    queryKey: ["friendList"],
    queryFn: ({ pageParam }) => getFriendList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  // 친구 삭제 버튼 클릭 시
  const handleDelete = async (friendUuid: string) => {
    await postDeleteFriend(friendUuid)
    Swal.fire({
      title: ALERT_MESSAGES.FRIEND.DELETE,
      width: "500px",
      padding: "40px",
    })
    refetchFriends()
  }

  if (!friendsData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      <InfiniteQuery
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      {friendsData.pages.map((page, i) => (
        <div key={i}>
          {page.length !== 0 && (
            <div>
              {page.map((friend, friendIndex) => (
                <FriendItem
                  key={friendIndex}
                  friend={friend}
                  isDeleteMode={isDeleteMode}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FriendList
