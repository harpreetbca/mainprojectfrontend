import { useEffect, useState } from "react";
import API from "../api.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/getproduct");
      setProducts(res.data.data); // 'data' contains the product array
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/deleteproduct/${id}`);
      fetchProducts(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{product.productname}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.stock}</p>
          <Link to={`/edit/${product._id}`}>✏️ Edit</Link>{" "}
          <button onClick={() => deleteProduct(product._id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
}
