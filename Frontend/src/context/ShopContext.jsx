import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import  { authDataContext } from "./AuthContext.jsx";

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const { serverUrl } = useContext(authDataContext);

  const currency = "₹";
  const deliveryCharge = 50;

  // 🔥 Fetch Products
  const getProducts = async () => {
    try {

      const result = await axios.get(
        `${serverUrl}/api/product/list`
      );

      // backend sends { products }
      setProducts(result.data.products);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  
  useEffect(() => {
    getProducts();
  }, []);

 
  const values = {
    products,
    setProducts,
    currency,
    deliveryCharge,
    getProducts,

    search,
    setSearch,
  };

  return (
    <ShopDataContext.Provider value={values}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContext;