import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import useModalStore from "@/stores/ModalStore"
import getFriendList from "@/services/main/friends/getFriendList"
import postDeleteFriend from "@/services/main/friends/postDeleteFriend"
import FriendItem from "./FriendItem"
import ALERT_MESSAGES from "@/constants/alertMessages"

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

  // 스크롤 이벤트 함수
  const handleScroll = (event: Event) => {
    const target = event.target as Document
    if (
      // 문서의 최상단부터 현재 스크롤된 거리 + 현재 창의 높이 + 100px가 문서 전체의 높이를 넘으면 다음 페이지 불러옴
      target.documentElement.scrollTop + window.innerHeight + 100 >=
      target.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        // 다음 페이지가 존재하고, 다음 페이지 데이터를 불러오는 중이 아니면 다음 페이지 불러옴
        fetchNextPage()
      }
    }
  }

  // 스크롤 이벤트 리스너 등록(스크롤 할 때마다 handleScroll 함수 실행)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll) // 컴포넌트 언마운트 시 이벤트 리스너 제거
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
