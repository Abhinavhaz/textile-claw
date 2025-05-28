import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    description: "",
    style: "repetitive pattern",
    color_info: "",
    simplicity: 5,
    n_options: 1,
    reference_images: [],
  });

  const [editFormData, setEditFormData] = useState({
    description: "",
    image: ""
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editError, setEditError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [tileConfig, setTileConfig] = useState({ rows: 3, cols: 4 });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "reference_images") {
      setFormData((prev) => ({
        ...prev,
        reference_images: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setShowEditForm(false);

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("style", formData.style);
    formDataToSend.append("color_info", formData.color_info);
    formDataToSend.append("simplicity", formData.simplicity.toString());
    formDataToSend.append("n_options", formData.n_options.toString());

    if (formData.reference_images.length > 0) {
      formData.reference_images.forEach((file) => {
        formDataToSend.append("reference_images", file);
      });
    }

    try {
      const response = await fetch("https://textile-image-backend.onrender.com/api/create_image", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message || "Failed to generate images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("description", editFormData.description);
    formDataToSend.append("image", selectedImage);

    try {
      const response = await fetch("https://textile-image-backend.onrender.com/api/edit_image", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("editImg", response)
      const data = await response.json();

      // Replace the image at the correct index
      setResponse((prev) => {
        const updatedUrls = [...prev.cloudinary_urls];
        updatedUrls[selectedImageIndex] = data.filename; // ✅ correct key
        return { ...prev, cloudinary_urls: updatedUrls };
      });

      setShowEditForm(false);
    } catch (err) {
      console.error("Error editing image:", err);
      setEditError(err.message || "Failed to edit image. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
    setEditFormData({
      description: "",
      image: imageUrl
    });

    setShowEditForm(true);
  };

  const handleTileImage = async (imageUrl) => {
    try {
      const formData = new FormData();
      formData.append("image", imageUrl); // Send URL directly
      formData.append("rows", tileConfig.rows.toString());
      formData.append("cols", tileConfig.cols.toString());

      const response = await fetch("https://textile-image-backend.onrender.com/api/tile_image_grid", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const tiledImageUrl = data.filename;
      window.open(tiledImageUrl, "_blank");
    } catch (err) {
      alert("Failed to tile image: " + err.message);
    }
  };

  const handleDownload = async (url, index) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Download failed. Try right-click → Save image as.");
    }
  };


  return (
    <div className="container">
      <div className="form-card">
        <h2 className="form-title">🎨 Gemini AI Image Generator</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="description">Image Description:</label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="style">Style:</label>
            <select
              id="style"
              name="style"
              required
              value={formData.style}
              onChange={handleChange}
            >
              <option value="standalone">Standalone Image</option>
              <option value="repetitive pattern">Repetitive Pattern</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="color_info">Color Information:</label>
            <input
              id="color_info"
              name="color_info"
              type="text"
              required
              value={formData.color_info}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="simplicity">Simplicity (1-10):</label>
            <input
              id="simplicity"
              name="simplicity"
              type="range"
              min="1"
              max="10"
              required
              value={formData.simplicity}
              onChange={handleChange}
            />
            <span>{formData.simplicity}</span>
          </div>

          <div className="form-group">
            <label htmlFor="n_options">Number of Images (1-5):</label>
            <input
              id="n_options"
              name="n_options"
              type="number"
              min="1"
              max="5"
              required
              value={formData.n_options}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reference_images">Upload Reference Images:</label>
            <input
              id="reference_images"
              name="reference_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Generating..." : "Generate Images"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>

      {response && (
        <div className="results-container">
          <h3 className="results-title">{response.message}</h3>
          <div className="image-grid">
            {response.cloudinary_urls.map((url, index) => (
              <div key={index} className="image-card">
                <img
                  src={url}
                  alt={`Generated image ${index + 1}`}
                  className="generated-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/100x100?text=Image+Not+Found";
                  }}
                />
                <div className="image-actions">
                  <button
                    className="download-button"
                    onClick={() => handleDownload(url, index)}
                  >
                    Download
                  </button>

                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(url, index)}
                  >
                    Edit
                  </button>
                  <input
                    type="number"
                    name="rows"
                    min="1"
                    value={tileConfig.rows}
                    onChange={(e) => setTileConfig({ ...tileConfig, rows: e.target.value })}
                  />
                  <input
                    type="number"
                    name="cols"
                    min="1"
                    value={tileConfig.cols}
                    onChange={(e) => setTileConfig({ ...tileConfig, cols: e.target.value })}
                  />


                  <button
                    className="tile-button"
                    onClick={() => handleTileImage(url)}
                  >
                    Tile Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal-backdrop" onClick={() => setShowEditForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="form-title">✏️ Edit Image</h2>
            <form onSubmit={handleEditSubmit} className="form">
              <div className="form-group">
                <label htmlFor="edit-description">Edit Instructions:</label>
                <input
                  id="edit-description"
                  name="description"
                  type="text"
                  placeholder="e.g., Make background blue"
                  required
                  value={editFormData.description}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Image to Edit:</label>
                <img
                  src={selectedImage}
                  alt="Selected for editing"
                  className="edit-preview"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={editLoading}
                >
                  {editLoading ? "Editing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

