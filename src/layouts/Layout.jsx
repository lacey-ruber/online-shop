import { Outlet } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
