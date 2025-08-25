import { useState, useEffect } from "react";
import API from "../api.jsx";

export default function AddEditProduct() {
  const [products, setProducts] = useState([]);
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/getproduct");
      setProducts(res.data.data || []); // fallback if no data
    } catch (error) {
      console.error("Fetch Products Error:", error.response || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productname || !price || !stock) {
      alert("All fields are required");
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
        const res = await API.put(`/products/updateproduct/${editingId}`, productData);
        console.log("Update Response:", res.data);
      } else {
        // Add new product
        const res = await API.post("/products/createproduct", productData);
        console.log("Add Response:", res.data);
      }

      // Reset form
      setProductname("");
      setPrice("");
      setStock("");
      setEditingId(null);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Submit Error:", error.response || error.message);
      alert("Something went wrong! Check console.");
    }
  };

  const handleEdit = (product) => {
    setProductname(product.productname);
    setPrice(product.price);
    setStock(product.stock);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/products/deleteproduct/${id}`);
      console.log("Delete Response:", res.data);
      fetchProducts();
    } catch (error) {
      console.error("Delete Error:", error.response || error.message);
    }
  };

  return (
    <div>
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

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

      <h2 style={{ marginTop: "30px" }}>Product List</h2>
      {products.length === 0 && <p>No products available</p>}
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
