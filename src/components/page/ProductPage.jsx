import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../scss/components/_product-page.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../store/slices/cartSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  const { goods } = useSelector((state) => state.cart);

  const [product, setProduct] = useState();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(data);
      } catch (error) {
        alert("Не удалось отобразить товар");
        navigate("/");
      }
    }
    fetchProduct();
  }, []);

  const dispatch = useDispatch();

  const handleAddProduct = () => {
    try {
      dispatch(addProduct(product));
    } catch (error) {
      alert("Невозможно добавить товар в корзину");
    }
  };

  //Remove the item from the basket
  const handleClickRemove = (id) => {
    dispatch(removeProduct(id));
  };

  //Changed the back button
  if (product) {
    return (
      <div>
        <div className="product-page__back" onClick={handleGoBack}>
          <ArrowBackIosIcon />
          <p>Go Back to Home</p>
        </div>
        <div className="product-page">
          <img src={product.image} alt="Product" />
          <div className="product-page__wrapper">
            <h3>{product.title}</h3>
            <hr />
            <span>
              Price: <b>{product.price} ₽</b>
            </span>
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

            <hr />
            <span>Category: {product.category}</span>
            <span>Rating: {product.rating.rate}</span>
            <hr />
            <span>{product.description}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default ProductPage;
