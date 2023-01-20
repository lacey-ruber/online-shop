import { useState, useEffect, useCallback, useRef } from "react";
import _, { debounce } from "lodash";
import ProductCard from "../ui/ProductCard";
import Sort from "../common/Sort";
import Categories from "../common/Categories";
import Search from "../common/Search";
import { paginate } from "../../utils/paginate";
import "../../scss/components/_header.scss";
import "../../scss/app.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setSearchQuery,
  setSelectedCategories,
  setSortBy,
} from "../../store/slices/filterSlice";
import axios from "axios";
import Pagination from "../common/Pagination";
import {
  fetchProducts,
  getProducts,
  getProductsLoadingStatus,
} from "../../store/slices/productSlice";

const ProductsListPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts());
  const productsLoading = useSelector(getProductsLoadingStatus());
  const [categories, setCategories] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const inputRef = useRef(null);
  const [clearFilterAll, setClearFilterAll] = useState(true);
  const [debounceValue, setDebounceValue] = useState(valueSearch);

  const handleClearFilterAll = () => {
    setClearFilterAll(false);
  };

  async function fetchCategories() {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }

  useEffect(() => {
    dispatch(fetchProducts());
    fetchCategories();
  }, []);

  const { searchQuery, sortBy, selectedCategories, currentPage } = useSelector(
    (state) => state.filter
  );
  const pageSize = 9;

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [selectedCategories, valueSearch]);

  //While changing the page it will scroll to the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  //Debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(valueSearch);
    }, 500);

    //Cleaning
    return () => clearTimeout(timeout);
  }, [valueSearch]);

  useEffect(() => {
    let ignore = false;
    //IIFE-Immediately Invoked Function Expression
    (() => {
      if (!ignore) {
        dispatch(setSearchQuery(debounceValue));
      }
    })();
    //cleaning
    return () => {
      ignore = true;
    };
  }, [debounceValue]);

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
    setValueSearch("");
    inputRef.current?.focus();
  };

  const handleSearchQuery = ({ target }) => {
    setValueSearch(target.value);
    // searchDebounce(target.value);
    dispatch(setSelectedCategories(undefined));
  };
  const handlePageChange = (pageIndex) => {
    dispatch(setCurrentPage(pageIndex));
  };
  const handleCategoriesSelect = (item) => {
    if (valueSearch !== "") handleClearSearch();
    dispatch(setSelectedCategories(item));
  };
  const handleSort = (item) => {
    dispatch(setSortBy(item));
  };

  if (products) {
    const filteredProducts = searchQuery
      ? products.filter(
          (product) =>
            product.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1
        )
      : selectedCategories
      ? products.filter(
          (product) =>
            JSON.stringify(product.category) ===
            JSON.stringify(selectedCategories)
        )
      : products;
    const count = products ? filteredProducts.length : undefined;
    const sortedProducts = _.orderBy(
      filteredProducts,
      [sortBy.path],
      [sortBy.order]
    );
    const productCrop = paginate(sortedProducts, currentPage, pageSize);

    const clearFilter = () => {
      if (searchQuery !== "") dispatch(setSearchQuery(""));
      dispatch(setSelectedCategories(""));
    };
    return (
      <section className="goods">
        <div className="categories">
          <div className="categories__wrapper">
            {isLoading && <p>Loading...</p>}
            {categories && (
              <>
                <div onClick={() => setClearFilterAll(true)}>
                  <button
                    className={
                      "categories__btn-clear" +
                      (clearFilterAll ? " active" : "")
                    }
                    onClick={clearFilter}
                  >
                    All
                  </button>
                </div>

                <Categories
                  items={categories}
                  onItemSelect={handleCategoriesSelect}
                  selectedItem={selectedCategories}
                  setClearFilterAll={setClearFilterAll}
                />
              </>
            )}
          </div>
        </div>
        <Sort onSort={handleSort} selectedSort={sortBy} />
        <Search
          inputRef={inputRef}
          onClear={handleClearSearch}
          onSearch={handleSearchQuery}
          value={valueSearch}
          inFocus={valueSearch}
        />
        <div className="goods__wrapper">
          {productsLoading && <p>Loading goods...</p>}
          {error && <p>{error}</p>}
          {productCrop.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    );
  }
  return <p>Loading...</p>;
};

export default ProductsListPage;
