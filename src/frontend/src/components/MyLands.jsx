// // import React, { useEffect, useState } from "react";

// // function MyLands({ principal, backend }) {
// //   const [lands, setLands] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLands = async () => {
// //       const data = await backend.get_my_land();
// //       setLands(data);
// //       setLoading(false);
// //     };
// //     fetchLands();
// //   }, []);

// //   const toBase64 = (vec) => {
// //     const binary = new Uint8Array(vec).reduce(
// //       (acc, byte) => acc + String.fromCharCode(byte),
// //       ""
// //     );
// //     return `data:image/png;base64,${btoa(binary)}`;
// //   };

// //   return (
// //     <div>
// //       <h2>My Lands</h2>
// //       {loading ? <p>Loading...</p> : null}

// //       {lands.length === 0 && !loading ? (
// //         <p>You haven’t minted any lands yet.</p>
// //       ) : (
// //         <ul>
// //           {lands.map((land, i) => (
// //             <li
// //               key={i}
// //               style={{
// //                 marginBottom: "20px",
// //                 padding: "10px",
// //                 border: "1px solid #aaa",
// //               }}
// //             >
// //               <p>
// //                 <strong>ID:</strong> {land.id.toString()}
// //               </p>
// //               <p>
// //                 <strong>Name:</strong> {land.name}
// //               </p>
// //               <p>
// //                 <strong>Size:</strong> {land.size}
// //               </p>
// //               <p>
// //                 <strong>Coordinates:</strong> ({land.coordinates.x},{" "}
// //                 {land.coordinates.y})
// //               </p>
// //               <img
// //                 src={toBase64(land.image_data)}
// //                 alt="Land Preview"
// //                 style={{
// //                   maxWidth: "300px",
// //                   marginTop: "10px",
// //                   border: "1px solid #333",
// //                 }}
// //               />
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }

// // export default MyLands;


// import React, { useEffect, useState } from "react";

// function MyLands({ principal, backend }) {
//   const [lands, setLands] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLands = async () => {
//       setLoading(true); // Ensure loading is true when fetching starts
//       const data = await backend.get_my_land();
//       setLands(data);
//       setLoading(false);
//     };
//     fetchLands();
//   }, []);

//   const toBase64 = (vec) => {
//     const binary = new Uint8Array(vec).reduce(
//       (acc, byte) => acc + String.fromCharCode(byte),
//       ""
//     );
//     return `data:image/png;base64,${btoa(binary)}`;
//   };

//   return (
//     <div>
//       <h2>My Lands</h2>
//       {loading && <p className="message-text">Loading...</p>}

//       {!loading && lands.length === 0 ? (
//         <p className="message-text">You haven’t minted any lands yet.</p>
//       ) : (
//         <ul className="land-list">
//           {lands.map((land, i) => (
//             <li
//               key={i}
//               className="land-item"
//             >
//               <p>
//                 <strong>ID:</strong> {land.id.toString()}
//               </p>
//               <p>
//                 <strong>Name:</strong> {land.name}
//               </p>
//               <p>
//                 <strong>Size:</strong> {land.size}
//               </p>
//               <p>
//                 <strong>Coordinates:</strong> ({land.coordinates.x},{" "}
//                 {land.coordinates.y})
//               </p>
//               <img
//                 src={toBase64(land.image_data)}
//                 alt="Land Preview"
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default MyLands;


import React, { useEffect, useState } from "react";

function MyLands({ principal, backend }) {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      setLoading(true);
      try {
        const data = await backend.get_my_land();
        setLands(data);
      } catch (error) {
        console.error("Failed to fetch lands:", error);
        setLands([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
  }, [backend]); 

  const toBase64 = (vec) => {
   
    if (!vec || vec.length === 0) {
      return ''; 
    }
    const binary = new Uint8Array(vec).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${btoa(binary)}`;
  };

  return (
    <div>
      <h2>My Minted Lands</h2>
      {loading && <p className="message-text">Loading your lands...</p>}

      {!loading && lands.length === 0 ? (
        <p className="message-text">You haven’t minted any lands yet. Head over to "Mint Land" to create your first plot!</p>
      ) : (
        <ul className="land-list">
          {lands.map((land, i) => (
            <li
              key={land.id.toString()} 
              className="land-item"
            >
              <h3>{land.name || `Land #${land.id.toString()}`}</h3> {/* heading falbackl */}
              <img
                src={toBase64(land.image_data)}
                alt={`Land: ${land.name || land.id.toString()}`}
              />
              <p>
                <strong>ID:</strong> {land.id.toString()}
              </p>
              <p>
                <strong>Size:</strong> {land.size}
              </p>
              <p>
                <strong>Coordinates:</strong> ({land.coordinates.x},{" "}
                {land.coordinates.y})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyLands;