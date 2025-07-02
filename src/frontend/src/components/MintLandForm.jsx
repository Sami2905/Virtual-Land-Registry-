// // // import React, { useState } from "react";

// // // function MintLandForm({ principal, backend }) {
// // //   const [name, setName] = useState("");
// // //   const [x, setX] = useState("");
// // //   const [y, setY] = useState("");
// // //   const [size, setSize] = useState("");
// // //   const [image, setImage] = useState(null);
// // //   const [status, setStatus] = useState("");

// // //   const handleMint = async (e) => {
// // //     e.preventDefault();

// // //     if (!name || !x || !y || !size || !image) {
// // //       alert("Please fill all fields and select an image.");
// // //       return;
// // //     }

// // //     const imageBytes = await image.arrayBuffer();
// // //     const imageVec = Array.from(new Uint8Array(imageBytes));

// // //     try {
// // //       setStatus("Minting land...");
// // //       const id = await backend.mint_land(
// // //         name,
// // //         { x: Number(x), y: Number(y) },
// // //         size,
// // //         imageVec
// // //       );
// // //       setStatus(`✅ Land minted with ID: ${id}`);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setStatus("❌ Error minting land.");
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleMint}>
// // //       <div>
// // //         <label>Name: </label>
// // //         <input value={name} onChange={(e) => setName(e.target.value)} />
// // //       </div>

// // //       <div>
// // //         <label>Coordinates (x): </label>
// // //         <input value={x} onChange={(e) => setX(e.target.value)} type="number" />
// // //       </div>

// // //       <div>
// // //         <label>Coordinates (y): </label>
// // //         <input value={y} onChange={(e) => setY(e.target.value)} type="number" />
// // //       </div>

// // //       <div>
// // //         <label>Size: </label>
// // //         <input value={size} onChange={(e) => setSize(e.target.value)} />
// // //       </div>

// // //       <div>
// // //         <label>Image: </label>
// // //         <input
// // //           type="file"
// // //           accept="image/*"
// // //           onChange={(e) => setImage(e.target.files[0])}
// // //         />
// // //       </div>

// // //       <button type="submit" style={{ marginTop: "10px" }}>
// // //         Mint Land
// // //       </button>

// // //       <p>{status}</p>
// // //     </form>
// // //   );
// // // }

// // // export default MintLandForm;


// // import React, { useState } from "react";

// // function MintLandForm({ principal, backend }) {
// //   const [name, setName] = useState("");
// //   const [x, setX] = useState("");
// //   const [y, setY] = useState("");
// //   const [size, setSize] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [status, setStatus] = useState("");

// //   const handleMint = async (e) => {
// //     e.preventDefault();

// //     if (!name || !x || !y || !size || !image) {
// //       alert("Please fill all fields and select an image.");
// //       return;
// //     }

// //     const imageBytes = await image.arrayBuffer();
// //     const imageVec = Array.from(new Uint8Array(imageBytes));

// //     try {
// //       setStatus("Minting land...");
// //       const id = await backend.mint_land(
// //         name,
// //         { x: Number(x), y: Number(y) },
// //         size,
// //         imageVec
// //       );
// //       setStatus(`✅ Land minted with ID: ${id}`);
// //     } catch (err) {
// //       console.error(err);
// //       setStatus("❌ Error minting land.");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleMint}>
// //       <div className="form-group"> {/* Added class name */}
// //         <label>Name: </label>
// //         <input value={name} onChange={(e) => setName(e.target.value)} type="text" /> {/* Added type="text" for consistency */}
// //       </div>

// //       <div className="form-group"> {/* Added class name */}
// //         <label>Coordinates (x): </label>
// //         <input value={x} onChange={(e) => setX(e.target.value)} type="number" />
// //       </div>

// //       <div className="form-group"> {/* Added class name */}
// //         <label>Coordinates (y): </label>
// //         <input value={y} onChange={(e) => setY(e.target.value)} type="number" />
// //       </div>

// //       <div className="form-group"> {/* Added class name */}
// //         <label>Size: </label>
// //         <input value={size} onChange={(e) => setSize(e.target.value)} type="text" /> {/* Added type="text" */}
// //       </div>

// //       <div className="form-group"> {/* Added class name */}
// //         <label>Image: </label>
// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={(e) => setImage(e.target.files[0])}
// //         />
// //       </div>

// //       <button type="submit">
// //         Mint Land
// //       </button>

// //       {status && ( // Render status message only if there's content
// //         <p className={`status-message ${status.startsWith("✅") ? "success" : status.startsWith("❌") ? "error" : ""}`}>
// //           {status}
// //         </p>
// //       )}
// //     </form>
// //   );
// // }

// // export default MintLandForm;


// import React, { useState } from "react";

// function MintLandForm({ principal, backend }) {
//   const [name, setName] = useState("");
//   const [x, setX] = useState("");
//   const [y, setY] = useState("");
//   const [size, setSize] = useState("");
//   const [image, setImage] = useState(null);
//   const [status, setStatus] = useState("");

//   const handleMint = async (e) => {
//     e.preventDefault();

//     if (!name || x === "" || y === "" || !size || !image) { // Changed checks for x,y to include ""
//       setStatus("❌ Please fill all fields and select an image.");
//       return;
//     }

//     const imageBytes = await image.arrayBuffer();
//     const imageVec = Array.from(new Uint8Array(imageBytes));

//     try {
//       setStatus("Minting land...");
//       const id = await backend.mint_land(
//         name,
//         { x: Number(x), y: Number(y) },
//         size,
//         imageVec
//       );
//       setStatus(`✅ Land minted with ID: ${id}`);
//       // Optionally reset form after successful mint
//       setName("");
//       setX("");
//       setY("");
//       setSize("");
//       setImage(null);
//       // You might need to manually clear the file input, this is a common React challenge
//       // For now, it will just show "No file chosen" after successful mint.
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ Error minting land. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleMint}>
//       <h2>Mint Your New Land</h2>
//       <div className="form-group">
//         <label htmlFor="landName">Land Name:</label>
//         <input id="landName" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g., Green Valley Plot" required />
//       </div>

//       <div className="form-group">
//         <label htmlFor="coordX">Coordinate X:</label>
//         <input id="coordX" value={x} onChange={(e) => setX(e.target.value)} type="number" placeholder="e.g., 100" required />
//       </div>

//       <div className="form-group">
//         <label htmlFor="coordY">Coordinate Y:</label>
//         <input id="coordY" value={y} onChange={(e) => setY(e.target.value)} type="number" placeholder="e.g., 250" required />
//       </div>

//       <div className="form-group">
//         <label htmlFor="landSize">Land Size:</label>
//         <input id="landSize" value={size} onChange={(e) => setSize(e.target.value)} type="text" placeholder="e.g., 10x10 meters" required />
//       </div>

//       <div className="form-group">
//         <label htmlFor="landImage">Land Image:</label>
//         <input
//           id="landImage"
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />
//       </div>

//       <button type="submit">
//         Mint Land
//       </button>

//       {status && (
//         <p className={`status-message ${status.startsWith("✅") ? "success" : status.startsWith("❌") ? "error" : ""}`}>
//           {status}
//         </p>
//       )}
//     </form>
//   );
// }

// export default MintLandForm;


import React, { useState } from "react";

function MintLandForm({ principal, backend }) {
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0); 

  const handleMint = async (e) => {
    e.preventDefault();

    
    if (!name.trim() || x === "" || y === "" || !size.trim() || !image) {
      setStatus("❌ Please fill all fields and select an image.");
      return;
    }

    const parsedX = Number(x);
    const parsedY = Number(y);

    if (isNaN(parsedX) || isNaN(parsedY)) {
      setStatus("❌ Coordinates X and Y must be valid numbers.");
      return;
    }

    
    if (!(image instanceof File)) {
        setStatus("❌ Invalid image file selected. Please select a valid image.");
        
        setImage(null);
        setFileInputKey(prevKey => prevKey + 1);
        return;
    }

    let imageVec;
    try {
      
      const imageBytes = await image.arrayBuffer();
      imageVec = Array.from(new Uint8Array(imageBytes));
    } catch (imageError) {
     
      console.error("Error reading image file:", imageError);
      setStatus("❌ Failed to read image file. Please try another image.");
      return;
    }

    try {
      setStatus("Minting land..."); 
      const id = await backend.mint_land(
        name.trim(),       
        { x: parsedX, y: parsedY }, 
        size.trim(),        
        imageVec           
      );
      setStatus(`✅ Land minted with ID: ${id}.`);
      
      setName("");
      setX("");
      setY("");
      setSize("");
      setImage(null);
      setFileInputKey(prevKey => prevKey + 1); 
    } catch (err) {
    
      console.error("Error calling backend.mint_land:", err);

      let errorMessage = "❌ Error minting land. Please try again.";
      if (err && typeof err === 'object' && 'message' in err) {
          
          errorMessage += ` Details: ${err.message}`;
      } else if (typeof err === 'string') {
          errorMessage += ` Details: ${err}`;
      }

      setStatus(errorMessage + " (Check console for more details)");
    }
  };

  return (
    <form onSubmit={handleMint}>
      <h2>Mint Your New Land</h2>
      <div className="form-group">
        <label htmlFor="landName">Land Name:</label>
        <input id="landName" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g., Green Valley Plot" required />
      </div>

      <div className="form-group">
        <label htmlFor="coordX">Coordinate X:</label>
        <input id="coordX" value={x} onChange={(e) => setX(e.target.value)} type="number" placeholder="e.g., 100" required />
      </div>

      <div className="form-group">
        <label htmlFor="coordY">Coordinate Y:</label>
        <input id="coordY" value={y} onChange={(e) => setY(e.target.value)} type="number" placeholder="e.g., 250" required />
      </div>

      <div className="form-group">
        <label htmlFor="landSize">Land Size:</label>
        <input id="landSize" value={size} onChange={(e) => setSize(e.target.value)} type="text" placeholder="e.g., 10x10 meters" required />
      </div>

      <div className="form-group">
        <label htmlFor="landImage">Land Image:</label>
        <input
          key={fileInputKey} //re render
          id="landImage"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>

      <button type="submit">
        Mint Land
      </button>

      {status && (
        <p className={`status-message ${status.startsWith("✅") ? "success" : status.startsWith("❌") ? "error" : ""}`}>
          {status}
        </p>
      )}
    </form>
  );
}

export default MintLandForm;