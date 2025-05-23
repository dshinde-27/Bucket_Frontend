import React, { useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';
import '../Style/add-author.css';
import { FaFacebookSquare, FaInstagramSquare, FaTwitter, FaLinkedin } from "react-icons/fa";

function AddAuthor() {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [dragOverProfile, setDragOverProfile] = useState(false);
  const [dragOverCover, setDragOverCover] = useState(false);
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // IMPORTANT: Use capitalized keys to match AuthorDto properties!
      formData.append('Name', newAuthor.name);
      formData.append('Languages', newAuthor.languages);
      formData.append('Bio', newAuthor.bio);
      formData.append('Quote', newAuthor.quote);
      formData.append('ActiveFrom', newAuthor.activeFrom);
      formData.append('ExpiryDate', newAuthor.expiryDate);
      formData.append('SocialLinks', JSON.stringify(socialLinks));

      if (profileInputRef.current?.files[0]) {
        formData.append('ProfileImage', profileInputRef.current.files[0]);
      }
      if (coverInputRef.current?.files[0]) {
        formData.append('CoverImage', coverInputRef.current.files[0]);
      }

      const response = await axios.post(
        'https://localhost:7086/api/author/upload-author', // match backend route
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert(`Author created successfully with ID: ${response.data.authorId}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong while submitting the author.');
    }
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
          <ImageUpload
            title="Author Image"
            note="Upload your author image here"
            image={profileImage}
            setImage={setProfileImage}
            inputRef={profileInputRef}
            isDragOver={dragOverProfile}
            setIsDragOver={setDragOverProfile}
          />

          {/* Cover Image Upload */}
          <ImageUpload
            title="Cover Image"
            note="Upload your cover image here"
            image={coverImage}
            setImage={setCoverImage}
            inputRef={coverInputRef}
            isDragOver={dragOverCover}
            setIsDragOver={setDragOverCover}
          />

          {/* Author Info */}
          <div className="modal-row">
            <div className="modal-left">
              <h4>Description</h4>
              <p className="banner-note">Add your author info and social media</p>
            </div>
            <div className="modal-right">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={newAuthor.name} onChange={handleChange('name')} />
              </div>
              <div className="form-group">
                <label>Languages</label>
                <input type="text" value={newAuthor.languages} onChange={handleChange('languages')} placeholder="Comma separated" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea rows="2" value={newAuthor.bio} onChange={handleChange('bio')} placeholder="Author bio" />
              </div>
              <div className="form-group">
                <label>Quote</label>
                <textarea rows="2" value={newAuthor.quote} onChange={handleChange('quote')} placeholder="Favorite quote" />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Active From</label>
                  <input type="date" value={newAuthor.activeFrom} onChange={handleChange('activeFrom')} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Will Expire</label>
                  <input type="date" value={newAuthor.expiryDate} onChange={handleChange('expiryDate')} />
                </div>
              </div>

              {/* Social Media */}
              <div className="form-group">
                <label>Social Media</label>
                {socialLinks.map((item, index) => (
                  <div className="value-row" key={index}>
                    <div className="icon-preview">
                      {item.platform === 'facebook' && <FaFacebookSquare />}
                      {item.platform === 'twitter' && <FaTwitter />}
                      {item.platform === 'instagram' && <FaInstagramSquare />}
                      {item.platform === 'linkedin' && <FaLinkedin />}
                    </div>
                    <select
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
                      type="text"
                      placeholder="Enter URL"
                      value={item.url}
                      onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                    />
                    <button className="btn-remove" onClick={() => handleRemoveSocial(index)}>Remove</button>
                  </div>
                ))}
                <button className="btn-add-value" onClick={handleAddSocial}>
                  + Add Social Link
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const ImageUpload = ({ title, note, image, setImage, inputRef, isDragOver, setIsDragOver }) => {
  return (
    <div className="modal-row">
      <div className="modal-left">
        <h4>{title}</h4>
        <p className="banner-note">{note}</p>
      </div>
      <div className="modal-right">
        <div
          className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
          onClick={() => inputRef.current.click()}
          onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setImage(imageUrl);
              inputRef.current.files = e.dataTransfer.files;
            }
          }}
        >
          <p>Upload an image or drag and drop</p>
          <p>PNG, JPG</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl);
              }
            }}
          />
        </div>
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAuthor;
