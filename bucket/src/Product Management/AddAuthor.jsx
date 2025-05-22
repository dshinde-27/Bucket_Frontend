import React, { useState, useRef } from 'react';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';
import '../Style/add-author.css';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function AddAuthor() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const profileInputRef = useRef();
  const coverInputRef = useRef();

  const [newAuthor, setNewAuthor] = useState({
    name: '',
    languages: '',
    bio: '',
    quote: '',
    activeFrom: '',
    expiryDate: '',
  });

  const [socialLinks, setSocialLinks] = useState([]);

  const handleChange = (field) => (e) => {
    setNewAuthor({ ...newAuthor, [field]: e.target.value });
  };

  const handleImageChange = (setter) => (fileList) => {
    const file = fileList[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setter(imageUrl);
    }
  };

  const openFileDialog = (ref) => {
    ref.current.click();
  };

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const handleRemoveSocial = (index) => {
    const updated = [...socialLinks];
    updated.splice(index, 1);
    setSocialLinks(updated);
  };

  const handleSocialChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleSubmit = () => {
    console.log('Author Info:', newAuthor);
    console.log('Social Media:', socialLinks);
    // Handle API call or further form submission here
  };

  return (
    <div
      className="role-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="role-container">
          <div className="role-header">
            <h2>Add New Author</h2>
            <button className="submit-btn" onClick={handleSubmit}>Save Author</button>
          </div>

          {/* Profile Image Upload */}
          <div className="modal-row" style={{ border: 'none' }}>
            <div className="modal-left">
              <h4>Author Image</h4>
              <p className="banner-note">Upload your author image here</p>
            </div>
            <div className="modal-right">
              <div
                className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                onClick={() => openFileDialog(profileInputRef)}
                onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  handleImageChange(setProfileImage)(e.dataTransfer.files);
                }}
              >
                <p>Upload an image or drag and drop</p>
                <p>PNG, JPG</p>
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => handleImageChange(setProfileImage)(e.target.files)}
                />
              </div>
              {profileImage && (
                <div className="image-preview">
                  <img src={profileImage} alt="Author preview" />
                </div>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="modal-row">
            <div className="modal-left">
              <h4>Cover Image</h4>
              <p className="banner-note">Upload your cover image here</p>
            </div>
            <div className="modal-right">
              <div
                className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                onClick={() => openFileDialog(coverInputRef)}
                onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  handleImageChange(setCoverImage)(e.dataTransfer.files);
                }}
              >
                <p>Upload an image or drag and drop</p>
                <p>PNG, JPG</p>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => handleImageChange(setCoverImage)(e.target.files)}
                />
              </div>
              {coverImage && (
                <div className="image-preview">
                  <img src={coverImage} alt="Cover preview" />
                </div>
              )}
            </div>
          </div>

          {/* Author Info (including Social Media) */}
          <div className="modal-row">
            <div className="modal-left">
              <h4>Description</h4>
              <p className="banner-note">Add your author info and social media</p>
            </div>
            <div className="modal-right">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={handleChange('name')}
                />
              </div>

              <div className="form-group">
                <label>Languages</label>
                <input
                  type="text"
                  placeholder="Comma separated"
                  value={newAuthor.languages}
                  onChange={handleChange('languages')}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  rows="2"
                  placeholder="Author bio"
                  value={newAuthor.bio}
                  onChange={handleChange('bio')}
                />
              </div>

              <div className="form-group">
                <label>Quote</label>
                <textarea
                  rows="2"
                  placeholder="Favorite quote"
                  value={newAuthor.quote}
                  onChange={handleChange('quote')}
                />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Active From</label>
                  <input
                    type="date"
                    value={newAuthor.activeFrom}
                    onChange={handleChange('activeFrom')}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Will Expire</label>
                  <input
                    type="date"
                    value={newAuthor.expiryDate}
                    onChange={handleChange('expiryDate')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Social Media</label>
                {socialLinks.length === 0 ? (
                  <button className="btn-add-value" onClick={handleAddSocial}>
                    + Add Social Link
                  </button>
                ) : (
                  <>
                    {socialLinks.map((item, index) => (
                      <div className="value-row">
                        <div className="icon-preview">
                          {item.platform === 'facebook' && <FaFacebookSquare />}
                          {item.platform === 'twitter' && <FaTwitter />}
                          {item.platform === 'instagram' && <FaInstagramSquare />}
                          {item.platform === 'linkedin' && <FaLinkedin />}
                        </div>

                        <select
                          style={{ width: "70%" }}
                          value={item.platform}
                          onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                        >
                          <option value="">Select Platform</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">Twitter</option>
                          <option value="instagram">Instagram</option>
                          <option value="linkedin">LinkedIn</option>
                        </select>

                        <input
                          style={{ width: "70%" }}
                          type="text"
                          placeholder="Enter URL"
                          value={item.url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                        />

                        <button className="btn-remove" onClick={() => handleRemoveSocial(index)}>
                          Remove
                        </button>
                      </div>

                    ))}
                    <button className="btn-add-value" onClick={handleAddSocial}>
                      + Add More
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAuthor;
