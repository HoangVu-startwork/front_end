import React, { useState } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

function Loaisanphamdt() {
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    const cld = new Cloudinary({ cloud: { cloudName: 'du6ybb3by' } });
  
    // Handle file selection
    const handleFileInputChange = (event) => {
      setImageSelected(event.target.files[0]);
    };
  
    // Handle image upload to Cloudinary
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'ml_default'); // You may need to set up an unsigned upload preset
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/du6ybb3by/image/upload',
          formData
        );
        setImageUrl(response.data.secure_url); // Set the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  return (
    <div>
    <h2>Select and Upload an Image to Cloudinary</h2>
    
    <input type="file" onChange={handleFileInputChange} />
    <button onClick={handleUpload}>Upload Image</button>

    {imageUrl && (
      <>
        <h3>Uploaded Image</h3>
        {/* Display the uploaded image */}
        <img src={imageUrl} alt="Uploaded to Cloudinary" style={{ width: '500px', height: '500px' }} />
      </>
    )}
  </div>
  )
}

export default Loaisanphamdt