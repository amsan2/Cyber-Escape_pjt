import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { getQueryClient } from "@/hooks/getQueryClient"
import Main from "@/components/main/myhome/Main"
import { themeIdx } from "@/components/common/ThemeSelectBox"
import postMyRanking from "@/services/main/ranking/postMyRanking"

const Page = async () => {
  const queryClient = getQueryClient()
  await Promise.all(
    themeIdx.map((idx) =>
      queryClient.prefetchQuery({
        queryKey: ["myRanking", idx],
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
