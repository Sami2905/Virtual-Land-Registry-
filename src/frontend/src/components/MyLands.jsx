import React, { useEffect, useState } from 'react';
import { backend } from '../../../declarations/backend';

function MyLands({ principal }) {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      const data = await backend.get_my_land();
      setLands(data);
      setLoading(false);
    };
    fetchLands();
  }, []);

  const toBase64 = (vec) => {
    const binary = new Uint8Array(vec).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return `data:image/png;base64,${btoa(binary)}`;
  };

  return (
    <div>
      <h2>My Lands</h2>
      {loading ? <p>Loading...</p> : null}

      {lands.length === 0 && !loading ? (
        <p>You haven’t minted any lands yet.</p>
      ) : (
        <ul>
          {lands.map((land, i) => (
            <li key={i} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #aaa' }}>
              <p><strong>ID:</strong> {land.id.toString()}</p>
              <p><strong>Name:</strong> {land.name}</p>
              <p><strong>Size:</strong> {land.size}</p>
              <p><strong>Coordinates:</strong> ({land.coordinates.x}, {land.coordinates.y})</p>
              <img
                src={toBase64(land.image_data)}
                alt="Land Preview"
                style={{ maxWidth: '300px', marginTop: '10px', border: '1px solid #333' }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyLands;
