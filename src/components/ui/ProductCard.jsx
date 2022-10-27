import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../../store/slices/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cartProduct = useSelector((state) =>
    state.cart.goods.find((obj) => obj.id === product.id)
  )
  const addedCount = cartProduct ? cartProduct.count : 0

  const handleAddProduct = () => {
    dispatch(addProduct(product))
  }

  return (
    <div className='product-card' key={product.id}>
      <img className='product-card__image' src={product.image} alt='Product' />
      <Link to={`/catalog/${product.id}`}>
        <div className='product-card__title'>{product.title}</div>
      </Link>
      <div className='product-card__wrapper'>
        <div className='product-card__price'>{product.price} ₽</div>
        <hr />
        <div className='product-card__order' onClick={handleAddProduct}>
          Add to Basket {addedCount > 0 && <span>{addedCount}</span>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
