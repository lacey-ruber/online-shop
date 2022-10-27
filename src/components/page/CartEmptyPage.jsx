import { Link } from 'react-router-dom'
import '../../scss/components/_cart.scss'

const CartEmptyPage = () => {
  return (
    <div className='cart-empty'>
      <h1>There are no items in your cart yet</h1>
      <p>To start shopping, go to the products page</p>
      <Link to='/'>Go shopping</Link>
    </div>
  )
}

export default CartEmptyPage
