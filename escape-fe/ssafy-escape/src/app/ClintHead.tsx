import Head from "next/head"

// 로컬에선 적용이 되는데 왜 배포에선 안될까? 이미지 서버에서 ttf 파일 같이 ico 파일을 못 받는 걸까?
const ClientHead = () => {
  return (
    <Head>
      <link
        rel="icon"
        href={process.env.NEXT_PUBLIC_IMAGE_URL + "/favicon.ico"}
      />
    </Head>
  )
}

export default ClientHead
