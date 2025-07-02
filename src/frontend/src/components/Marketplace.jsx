import React, { useEffect, useState } from "react";

function Marketplace({ backend, principal }) {
  const [allListings, setAllListings] = useState([]);
  const [myUnlistedLands, setMyUnlistedLands] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [myLands, marketplaceListings] = await Promise.all([
        backend.get_my_land(),
        backend.get_marketplace_listings(), // Returns [(LandNFT, Listing)]
      ]);

      const listedIds = marketplaceListings.map(
        ([land, listing]) => listing.land_id
      );
      const unlisted = myLands.filter((land) => !listedIds.includes(land.id));

      setMyUnlistedLands(unlisted);
      setAllListings(marketplaceListings);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setStatus("❌ Failed to load marketplace data");
      setLoading(false);
    }
  };

  const toBase64 = (vec) => {
    const binary = new Uint8Array(vec).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${btoa(binary)}`;
  };

  const handleList = async (id) => {
    const price = prompt(`Enter listing price for Land #${id} (ICP):`);
    if (!price || isNaN(price)) return alert("Invalid price.");

    setStatus(`Listing land #${id}...`);
    try {
      const result = await backend.list_land_for_sale(id, Number(price));

      // ✅ UPDATED: Handle the new ListingResult type
      if (result && typeof result === "object") {
        if ("Ok" in result) {
          setStatus(`✅ Listed Land #${id} for ${price} ICP`);
          fetchData();
        } else if ("Err" in result) {
          setStatus(`❌ Failed to list land: ${result.Err}`);
        }
      } else {
        setStatus(`❌ Unexpected response format`);
      }
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to list land: ${err.message || err}`);
    }
  };

  const handleBuy = async (id) => {
    setStatus(`Processing purchase for Land #${id}...`);
    try {
      const result = await backend.buy_land(id);

      if (result && typeof result === "object") {
        if ("Ok" in result) {
          setStatus(`✅ Successfully purchased Land #${id}`);
          fetchData(); // Refresh data
        } else if ("Err" in result) {
          setStatus(`❌ Purchase failed: ${result.Err}`);
        }
      } else {
        setStatus(`❌ Unexpected response format`);
      }
    } catch (err) {
      console.error(err);
      setStatus(`❌ Purchase failed: ${err.message || err}`);
    }
  };

  // Handle unlisting functionality
  const handleUnlist = async (id) => {
    setStatus(`Removing listing for Land #${id}...`);
    try {
      const result = await backend.remove_listing(id);

      if (result && typeof result === "object") {
        if ("Ok" in result) {
          setStatus(`✅ Removed listing for Land #${id}`);
          fetchData(); // Refresh data
        } else if ("Err" in result) {
          setStatus(`❌ Failed to remove listing: ${result.Err}`);
        }
      } else {
        setStatus(`❌ Unexpected response format`);
      }
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to remove listing: ${err.message || err}`);
    }
  };

  return (
    <div>
      <h2>🏪 Marketplace</h2>
      {status && (
        <p style={{ color: status.includes("✅") ? "green" : "red" }}>
          {status}
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* SECTION 1: User's unlisted lands */}
          {myUnlistedLands.length > 0 && (
            <>
              <h3>🏠 Your Lands (Available to List)</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {myUnlistedLands.map((land, i) => (
                  <li
                    key={i}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "20px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <p>
                      <strong>ID:</strong> {land.id.toString()}
                    </p>
                    <p>
                      <strong>Name:</strong> {land.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {land.size}
                    </p>
                    <p>
                      <strong>Coordinates:</strong> ({land.coordinates.x},{" "}
                      {land.coordinates.y})
                    </p>
                    {land.image_data && land.image_data.length > 0 && (
                      <img
                        src={toBase64(land.image_data)}
                        alt="Land"
                        style={{
                          maxWidth: "300px",
                          marginTop: "10px",
                          borderRadius: "4px",
                        }}
                      />
                    )}
                    <br />
                    <button
                      onClick={() => handleList(land.id)}
                      style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      📋 List for Sale
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* SECTION 2: Marketplace listings */}
          <h3>🛒 Listed Lands (Available to Buy)</h3>
          {allListings.length === 0 ? (
            <p>No lands currently listed in the marketplace.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {allListings.map(([land, listing], i) => (
                <li
                  key={i}
                  style={{
                    border: "1px solid #aaa",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "20px",
                    backgroundColor:
                      listing.seller === principal ? "#fff3cd" : "#ffffff",
                  }}
                >
                  <p>
                    <strong>ID:</strong> {land.id.toString()}
                  </p>
                  <p>
                    <strong>Name:</strong> {land.name}
                  </p>
                  <p>
                    <strong>Size:</strong> {land.size}
                  </p>
                  <p>
                    <strong>Coordinates:</strong> ({land.coordinates.x},{" "}
                    {land.coordinates.y})
                  </p>
                  <p>
                    <strong>💰 Price:</strong> {listing.price.toString()} ICP
                  </p>
                  <p>
                    <strong>👤 Seller:</strong> {listing.seller.toText()}
                  </p>
                  <p>
                    <strong>📅 Listed:</strong>{" "}
                    {new Date(
                      Number(listing.listed_at) / 1000000
                    ).toLocaleDateString()}
                  </p>

                  {land.image_data && land.image_data.length > 0 && (
                    <img
                      src={toBase64(land.image_data)}
                      alt="Land"
                      style={{
                        maxWidth: "300px",
                        marginTop: "10px",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                  <br />

                  {/* ✅ IMPROVED: Better button logic */}
                  {listing.seller === principal ? (
                    <div style={{ marginTop: "10px" }}>
                      <button
                        disabled
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          marginRight: "10px",
                        }}
                      >
                        🏷️ Listed by You
                      </button>
                      <button
                        onClick={() => handleUnlist(land.id)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ❌ Remove Listing
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleBuy(land.id)}
                      style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      💰 Buy Now
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Marketplace;
