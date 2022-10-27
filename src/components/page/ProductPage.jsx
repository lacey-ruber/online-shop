import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../scss/components/_product-page.scss'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/slices/cartSlice'

const ProductPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate('/')
  }

  const [product, setProduct] = useState()
  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        )
        setProduct(data)
      } catch (error) {
        alert('Не удалось отобразить товар')
        navigate('/')
      }
    }
    fetchProduct()
  }, [])

  const dispatch = useDispatch()

  const handleAddProduct = () => {
    try {
      dispatch(addProduct(product))
    } catch (error) {
      alert('Невозможно добавить товар в корзину')
    }
  }

  if (product) {
    return (
      <>
        <button className='product-page__back' onClick={handleGoBack}>
          Назад
        </button>
        <div className='product-page'>
          <img src={product.image} alt='Product' />
          <div className='product-page__wrapper'>
            <h3>{product.title}</h3>
            <hr />
            <span>
              Price: <b>{product.price} ₽</b>
            </span>
            <div onClick={handleAddProduct} className='product-card__order'>
              Add to Basket
            </div>
            <hr />
            <span>Category: {product.category}</span>
            <span>Rating: {product.rating.rate}</span>
            <hr />
            <span>{product.description}</span>
          </div>
        </div>
      </>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default ProductPage
