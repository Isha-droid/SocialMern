// utils/cloudinaryUpload.js
import axios from 'axios';

const cloudinaryUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'myntra_social'); // Replace with your Cloudinary upload preset

    const response = await axios.post(`https://api.cloudinary.com/v1_1/dp6r7jk5u/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.secure_url; // URL of the uploaded image on Cloudinary
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export default cloudinaryUpload;
