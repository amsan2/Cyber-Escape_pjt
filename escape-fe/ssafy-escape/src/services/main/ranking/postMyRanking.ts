// import API_PATH from "@/constants/path"
// import api from "/api"

// interface PostMyRankingBodyProps {
//   status: number
//   message: string
//   data: PostMyRankingDataProps
// }

// interface PostMyRankingDataProps {
//   rank: number
//   nickname: string
//   bestTime: string
//   category: number
// }

// // 테마별 나의 랭킹 조회
// const postMyRanking = async (
//   userUuid: string,
//   themaUuid: string,
// ): Promise<PostMyRankingDataProps> => {
//   try {
//     const response = await api.post<PostMyRankingBodyProps>(
//       API_PATH.MAIN.RANKING.MY_RANK,
//       {
//         userUuid,
//         themaUuid,
//       },
//     )
//     if (response.status === 400) {
//       throw new Error(`오류: ${response.data.message}`)
//     }
//     return response.data.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export default postMyRanking

import dummy from "./postMyRanking.json"
const postMyRanking = async (userUuid: string, themaUuid: string) => {
  console.log(userUuid, themaUuid)
  return dummy
}

export default postMyRanking
