import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/hooks/getQueryClient"
import Main from "@/components/main/myhome/Main"
import postMyRanking from "@/services/main/ranking/postMyRanking"

// 메인페이지
const Page = async () => {
  const themeIdx = [1, 4, 7]
  const queryClient = getQueryClient()
  await Promise.all(
    themeIdx.map((idx) =>
      queryClient.prefetchQuery({
        queryKey: ["myRanking", idx], // 모든 테마의 내 랭킹 데이터 prefetch
        queryFn: () => postMyRanking(idx),
      }),
    ),
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Main />
    </HydrationBoundary>
  )
}

export default Page
