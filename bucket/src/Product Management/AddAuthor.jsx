import React, { useState, useRef } from 'react';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';
import '../Style/add-author.css';

function AddAuthor() {
  const [profileImage, setProfileImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = (fileList) => {
    const file = fileList[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
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
          </div>

          {/* Image Upload */}
          <div className="modal-row" style={{ border: "none" }}>
            <div className="modal-left">
              <h4>Image</h4>
              <p className="banner-note">Upload your author image here</p>
            </div>
            <div className="modal-right">
              <div
                className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                onClick={openFileDialog}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  handleImageChange(e.dataTransfer.files);
                }}
              >
                <p>Upload an image or drag and drop</p>
                <p>PNG, JPG</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => handleImageChange(e.target.files)}
                  style={{ display: 'none' }}
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
                onClick={openFileDialog}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  handleImageChange(e.dataTransfer.files);
                }}
              >
                <p>Upload an image or drag and drop</p>
                <p>PNG, JPG</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => handleImageChange(e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>
              {profileImage && (
                <div className="image-preview">
                  <img src={profileImage} alt="Author preview" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddAuthor;
