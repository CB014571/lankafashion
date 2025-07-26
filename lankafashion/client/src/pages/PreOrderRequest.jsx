import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PreOrderRequest() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "seller") {
      alert("Access denied. Only sellers can use this page.");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your pre-order request has been submitted.");
    // You can handle backend submission here
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    background: "#fff8f0",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const labelStyle = { fontWeight: "bold", display: "block", marginTop: "15px" };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#cc6600",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "20px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#cc6600" }}>📦 Seller Pre-Order Request</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Description of Materials:</label>
        <textarea
          placeholder="What do you need?"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Estimated Quantity:</label>
        <input
          type="number"
          placeholder="e.g. 100 units"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Preferred Delivery Date:</label>
        <input
          type="date"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Optional Image Upload:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit Request</button>
      </form>
    </div>
  );
}
