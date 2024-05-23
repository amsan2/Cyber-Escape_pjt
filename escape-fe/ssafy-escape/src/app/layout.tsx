"use client"

import { usePathname } from "next/navigation"
import { notoSansKr } from "@/styles/GoogleFont"
import StyledComponentsRegistry from "../lib/registry"
import QueryProvider from "../hooks/QueryProvider"
import useUserStore from "@/stores/UserStore"
import ClientHead from "./ClintHead"
import "./globals.css"

const Layout = ({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  const pathname = usePathname()
  const segments = pathname.split("/")
  const { isLogin } = useUserStore()
  
  return (
    <html>
      <ClientHead />
      <body className={notoSansKr.className}>
        <QueryProvider>
          <StyledComponentsRegistry>
            {children}
            {pathname !== "/ingame" &&
              segments[1] !== "gameroom" &&
              isLogin &&
              modal}
          </StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default Layout
