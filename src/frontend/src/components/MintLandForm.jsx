import React, { useState } from "react";

function MintLandForm({ principal, backend }) {
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleMint = async (e) => {
    e.preventDefault();

    if (!name || !x || !y || !size || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const imageBytes = await image.arrayBuffer();
    const imageVec = Array.from(new Uint8Array(imageBytes));

    try {
      setStatus("Minting land...");
      const id = await backend.mint_land(
        name,
        { x: Number(x), y: Number(y) },
        size,
        imageVec
      );
      setStatus(`✅ Land minted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error minting land.");
    }
  };

  return (
    <form onSubmit={handleMint}>
      <div>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Coordinates (x): </label>
        <input value={x} onChange={(e) => setX(e.target.value)} type="number" />
      </div>

      <div>
        <label>Coordinates (y): </label>
        <input value={y} onChange={(e) => setY(e.target.value)} type="number" />
      </div>

      <div>
        <label>Size: </label>
        <input value={size} onChange={(e) => setSize(e.target.value)} />
      </div>

      <div>
        <label>Image: </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>
        Mint Land
      </button>

      <p>{status}</p>
    </form>
  );
}

export default MintLandForm;
