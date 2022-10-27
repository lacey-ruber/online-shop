import { Link, useLocation } from 'react-router-dom'
import '../../scss/components/_header.scss'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const { pathname } = useLocation()
  const { goods } = useSelector((state) => state.cart)

  const totalCount = goods.reduce((sum, product) => sum + product.count, 0)

  return (
    <header className='header'>
      <div className='header__wrapper wrapper'>
        <div className='header__controls'>
          <div className='header__menu'>
            <div className='menu-burger'></div>
          </div>
          <div className='header__logo'>
            <Link to='/'>
              <p>Online shop</p>
            </Link>
          </div>
        </div>
        <div className='header__controls header__controls-right'>
          {pathname !== 'cart' && (
            <Link to='/cart' className='header-cart-button'>
              <div className='header-cart-icon'>
                <svg width='21' height='25' viewBox='0 0 15 19' fill='none'>
                  <path d='M11.6917 5.63767C11.6917 4.49626 11.2676 3.4016 10.5127 2.59451C9.7578 1.78741 8.73395 1.33398 7.66639 1.33398C6.59882 1.33398 5.57497 1.78741 4.82009 2.59451C4.0652 3.4016 3.64111 4.49626 3.64111 5.63767'></path>
                  <rect x='0.5' y='5.18457' width='14' height='12.8839'></rect>
                </svg>
              </div>
              <div className='header-cart-circle'>{totalCount}</div>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
