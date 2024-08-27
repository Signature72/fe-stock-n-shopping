import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";

const HomePage = () => {
  // สร้าง state สำหรับ products
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7267/api/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.productID === product.productID
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", padding: "20px" }}>
        <div style={{ flex: "1", padding: "0 20px" }}>
          <ProductList products={products} addToCart={addToCart} />
        </div>
        <ShoppingCart
          cartItems={cartItems}
          setCartItems={setCartItems}
          fetchProducts={fetchProducts}
        />
      </div>
    </div>
  );
};

export default HomePage;
