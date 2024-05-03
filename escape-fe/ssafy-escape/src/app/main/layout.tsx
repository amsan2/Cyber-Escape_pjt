import MainHeader from "@/components/common/HeaderNav"
import Home from "@/components/home/Home"

const Layout = async () => {
  return (
    <>
      <MainHeader />
      <Home showText={false} />
    </>
  )
}

export default Layout
