import { NextPage } from "next"
import { AppProps } from "next/dist/shared/lib/router/router"

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <h1>AppLayout</h1>
      { children }
    </>
  )
}

export default AppLayout