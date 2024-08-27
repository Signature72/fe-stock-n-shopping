import React from "react";
import axios from "axios";

const ShoppingCart = ({ cartItems, setCartItems, fetchProducts }) => {
  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  };

  const handleIncreaseQuantity = (productID) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productID === productID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productID) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productID === productID
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productID) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productID !== productID)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateStock = async (cartItems) => {
    try {
      for (let item of cartItems) {
        await axios.put(
          `https://localhost:7267/api/Products/${item.productID}`,
          {
            productName: item.productName,
            stockQuantity: item.stockQuantity - item.quantity,
          }
        );
      }
      console.log("Stock updated successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Failed to update stock", error);
    }
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();

    // ตัด stock ของสินค้า
    handleUpdateStock(cartItems);

    // ล้างตะกร้าสินค้า
    handleClearCart();

    alert(`ชำระเงินสำเร็จ! ยอดที่ต้องชำระทั้งหมดคือ $${totalPrice.toFixed(2)}`);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productID}</td>
              <td>{item.productName}</td>
              <td>{item.unitPrice}</td>
              <td>{item.quantity}</td>
              <td>{(item.unitPrice * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => handleIncreaseQuantity(item.productID)}>
                  +
                </button>
                <button onClick={() => handleDecreaseQuantity(item.productID)}>
                  -
                </button>
                <button onClick={() => handleRemoveItem(item.productID)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default ShoppingCart;
