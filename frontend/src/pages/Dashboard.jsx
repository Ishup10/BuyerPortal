import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getMyFavorites,
  addFavorite,
  removeFavorite,
} from "../api/favoritesApi";
import { getAllProperties, createProperty } from "../api/propertyApi";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newProp, setNewProp] = useState({
    title: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [propData, favData] = await Promise.all([
        getAllProperties(),
        getMyFavorites(),
      ]);

      setProperties(propData);
      setFavorites(favData);
    } catch (err) {
      setMessage("Failed to sync with database.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (propertyId) => {
    const existingFav = favorites.find((f) => f.property_id === propertyId);
    try {
      if (existingFav) {
        await removeFavorite(existingFav.id);
        setMessage("Removed from favorites.");
      } else {
        await addFavorite(propertyId);
        setMessage("Added to favorites!");
      }
      
      const updatedFavs = await getMyFavorites();
      setFavorites(updatedFavs);
    } catch (err) {
      setMessage(err.message || "Action failed.");
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      await createProperty(newProp);
      setMessage("Property added successfully!");
      setNewProp({ title: "", price: "", location: "" });
      setShowForm(false);
      
      const updatedProps = await getAllProperties();
      setProperties(updatedProps);
    } catch (err) {
      setMessage("Failed to add property.");
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-user-info">
          <h2 className="dashboard-nav-title">{user?.name}'s Portal</h2>
          <div className="dashboard-user-details">
            <p className="dashboard-user-email">{user?.email}</p>
            <span className="dashboard-nav-role">
              Role: <strong>{user?.role}</strong>
            </span>
          </div>
        </div>
        <button onClick={logout} className="dashboard-logout-btn">
          Logout
        </button>
      </nav>

      <div className="dashboard-main">
        {message && <p className="dashboard-message">{message}</p>}

        {/* Add Property Section */}
        <section className="admin-actions">
          <button
            className="add-toggle-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add New Property"}
          </button>

          {showForm && (
            <form className="add-property-form" onSubmit={handleAddProperty}>
              <input
                placeholder="Title"
                value={newProp.title}
                onChange={(e) =>
                  setNewProp({ ...newProp, title: e.target.value })
                }
                required
              />
              <input
                placeholder="Price"
                value={newProp.price}
                onChange={(e) =>
                  setNewProp({ ...newProp, price: e.target.value })
                }
                required
              />
              <input
                placeholder="Location"
                value={newProp.location}
                onChange={(e) =>
                  setNewProp({ ...newProp, location: e.target.value })
                }
                required
              />
              <button type="submit" className="save-btn">
                Save to Database
              </button>
            </form>
          )}
        </section>

        <section className="dashboard-section">
          <h3>Available Properties</h3>
          <div className="dashboard-properties-grid">
            {properties.map((prop) => {
              const isFav = favorites.some((f) => f.property_id === prop.id);
              return (
                <div key={prop.id} className="dashboard-property-card">
                  <h4>{prop.title}</h4>
                  <p>
                    {prop.location} • {prop.price}
                  </p>
                  <button
                    onClick={() => handleToggleFavorite(prop.id)}
                    className={`dashboard-favorite-btn ${isFav ? "favorited" : ""}`}
                  >
                    {isFav ? "★ Favourited" : "☆ Add to Favourites"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="dashboard-favorites-section">
          <h3>Your Favorites List ({favorites.length})</h3>
          {loading ? (
            <p className="loading-text">Loading favorites...</p>
          ) : (
            <ul className="dashboard-favorites-list">
              {favorites.map((fav) => {
                const prop = properties.find((p) => p.id === fav.property_id);
                return (
                  <li key={fav.id} className="dashboard-fav-list-item">
                    <div className="fav-item-info">
                      <span className="fav-item-title">
                        {prop?.title || "Unknown Property"}
                      </span>
                      <span className="fav-item-location">
                        {prop?.location}
                      </span>
                    </div>
                    <button
                      className="dashboard-list-remove-btn"
                      onClick={() => handleToggleFavorite(prop?.id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
              {favorites.length === 0 && (
                <li className="empty-msg">No favorites yet.</li>
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
