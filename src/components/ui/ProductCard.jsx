import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // const cartProduct = useSelector((state) =>
  //   state.cart.goods.find((obj) => obj.id === product.id)
  // )
  // const addedCount = cartProduct ? cartProduct.count : 0

  const { goods } = useSelector((state) => state.cart);

  const handleClickRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleAddProduct = () => {
    dispatch(addProduct(product));
  };

  return (
    <div className="product-card" key={product.id}>
      <img className="product-card__image" src={product.image} alt="Product" />
      <Link to={`/catalog/${product.id}`}>
        <div className="product-card__title">{product.title}</div>
      </Link>
      <div className="product-card__wrapper">
        <div className="product-card__price">{product.price} ₽</div>
        <hr />
        {/* some method check whether atleast one element 
            in the array pass the test which is implemented in 
            the function */}
        {goods?.some((c) => c.id === product.id) ? (
          <div
            onClick={() => handleClickRemove(product.id)}
            className="product-card__order"
          >
            Remove from Basket
          </div>
        ) : (
          <div onClick={handleAddProduct} className="product-card__order">
            Add to Basket
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
