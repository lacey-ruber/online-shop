import { useDispatch } from 'react-redux'
import {
  addProduct,
  minusProduct,
  removeProduct,
} from '../../store/slices/cartSlice'

const CartProduct = ({ id, title, price, count, image }) => {
  const dispatch = useDispatch()

  const handleClickPlus = () => {
    dispatch(
      addProduct({
        id,
      })
    )
  }

  const handleClickMinus = () => {
    dispatch(minusProduct(id))
  }

  const handleClickRemove = () => {
    dispatch(removeProduct(id))
  }

  return (
    <li className='cart__item'>
      <div className='cart__item-wrapper'>
        <div className='cart__item-img'>
          <img src={image} alt='Product' />
        </div>
        <div className='cart__item-info'>
          <p>{title}</p>
        </div>
      </div>
      <div className='cart__item-wrapper'>
        <div className='cart__item-count'>
          <button
            onClick={handleClickMinus}
            className='button-circle button-minus'
            disabled={count === 1}
          >
            -
          </button>
          <b>{count}</b>
          <button
            onClick={handleClickPlus}
            className='button-circle button-plus'
          >
            +
          </button>
        </div>
        <div className='cart__item-price'>
          <b>{price * count} ₽</b>
        </div>
      </div>
      <div className='cart__item-remove'>
        <button
          onClick={handleClickRemove}
          className='button-circle button-remove'
        >
          x
        </button>
      </div>
    </li>
  )
}

export default CartProduct
