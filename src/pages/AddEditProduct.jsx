import { useState, useEffect } from "react";
import API from "../api.jsx";

export default function AddEditProduct() {
  const [products, setProducts] = useState([]);
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState(null); // null means creating new product

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/getproduct");
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      productname,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      if (editingId) {
        // Update
        await API.put(`/products/updateproduct/${editingId}`, productData);
      } else {
        // Create
        await API.post("/products/createproduct", productData);
      }
      setProductname("");
      setPrice("");
      setStock("");
      setEditingId(null);
      fetchProducts(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Handle Edit button click
  const handleEdit = (product) => {
    setProductname(product.productname);
    setPrice(product.price);
    setStock(product.stock);
    setEditingId(product._id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/deleteproduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

      {/* Form for Add/Edit */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px" }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* List of Products with Edit/Delete */}
      <h2 style={{ marginTop: "30px" }}>Product List</h2>
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
          <button
            onClick={() => handleEdit(product)}
            style={{ marginRight: "10px" }}
          >
            ✏️ Edit
          </button>
          <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
}
