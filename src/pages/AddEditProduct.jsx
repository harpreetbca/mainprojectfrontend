import { useState, useEffect } from "react";
import API from "../api.jsx";

export default function AddEditProduct() {
  const [products, setProducts] = useState([]);
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState(null); // null = creating new product
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/getproduct");
      setProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Products Error:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productname || !price || !stock) {
      alert("Please fill all fields!");
      return;
    }

    const productData = {
      productname,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      if (editingId) {
        // Update product
        await API.put(`/products/updateproduct/${editingId}`, productData);
        alert("Product updated successfully!");
      } else {
        // Create new product
        await API.post("/products/createproduct", productData);
        alert("Product added successfully!");
      }
      setProductname("");
      setPrice("");
      setStock("");
      setEditingId(null);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Submit Error:", error.response?.data || error.message);
      alert("Something went wrong! Check console for details.");
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
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/deleteproduct/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("Failed to delete product!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          >
            <h3>{product.productname}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleEdit(product)} style={{ marginRight: "10px" }}>
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
