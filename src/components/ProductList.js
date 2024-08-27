import React, { useState } from "react";

const ProductList = ({ products, addToCart }) => {
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [productId]: quantity,
    });
  };

  const handleAddToCart = (product) => {
    const quantity = selectedQuantities[product.productID] || 1;

    if (quantity > product.stockQuantity) {
      alert("จำนวนสินค้าที่เลือกมีมากกว่าจำนวนสินค้าคงเหลือ");
      return;
    }

    addToCart({ ...product, quantity });
  };

  return (
    <div>
      <h2>Stock List</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Stock Quantity</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productID}>
              <td>{product.productID}</td>
              <td>{product.productName}</td>
              <td>{product.unitPrice}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  value={selectedQuantities[product.productID] || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.productID,
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
