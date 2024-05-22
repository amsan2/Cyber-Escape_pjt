import { useEffect } from "react"

interface InfiniteQueryProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<unknown>
}

const InfiniteQuery = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteQueryProps) => {
  // 스크롤 이벤트 함수
  const handleScroll = (event: Event) => {
    const target = event.target as Document
    if (
      // 문서의 최상단부터 현재 스크롤된 거리 + 현재 창의 높이 + 50px가 문서 전체의 높이를 넘으면 다음 페이지 불러옴
      target.documentElement.scrollTop + window.innerHeight + 50 >=
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
  return null
}

export default InfiniteQuery
