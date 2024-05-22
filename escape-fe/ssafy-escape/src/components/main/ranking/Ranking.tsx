"use client"

import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import postRankingList from "@/services/main/ranking/postRankingList"
import * as S from "@/styles/RankingStyles"
import ThemeSelectBox, { themeIdx } from "@/components/common/ThemeSelectBox"
import InfiniteQuery from "@/hooks/InfiniteQuery"
import RankItem from "./RankItem"

// 전체 랭킹
const Ranking = () => {
  const [activeTheme, setActiveTheme] = useState<number>(0)
  const {
    data: rankingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["rankingList", themeIdx[activeTheme]],
    queryFn: ({ pageParam }) =>
      postRankingList(pageParam, themeIdx[activeTheme]),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  })

  // 테마 아이콘 클릭 시
  const handleThemeClick = (index: number) => {
    setActiveTheme(index)
  }

  if (!rankingData) {
    return <div>데이터 없음</div>
  }

  return (
    <div>
      <S.TitleBox>
        <EmojiEventsIcon sx={{ fontSize: "55px" }} />
        <div>싱글 랭킹</div>
      </S.TitleBox>
      <ThemeSelectBox
        activeTheme={activeTheme}
        handleThemeClick={handleThemeClick}
        justifyContent="end"
        paddingRight="10px"
      />
      <InfiniteQuery
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      {rankingData.pages.map((page, i) => (
        <S.RankingMainBox key={i}>
          <S.RankingSubBox>
            {page.length === 0 ? (
              <S.NoText>
                아직 클리어한 유저가 없습니다. 첫 클리어에 도전해보세요!
              </S.NoText>
            ) : (
              page.map((user, idx) => <RankItem key={idx} user={user} />)
            )}
          </S.RankingSubBox>
        </S.RankingMainBox>
      ))}
    </div>
  )
}

export default Ranking
