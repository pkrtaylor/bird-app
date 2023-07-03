import Head from 'next/head'
import Home from '../pages'

const Layout = ({title, children}) => {
  return (
    <>
    <Head>
        <title>{title}</title>
    </Head>
    <Home/>
  
    </>
  )
}

export default Layout