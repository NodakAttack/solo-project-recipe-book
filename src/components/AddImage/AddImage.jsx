import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddImage = ({recipeID}) => {

  // imagePath will be the URL returned from Cloudinary
  let [imagePath, setImagePath] = useState('');

  const onFileChange = async (event) => {
    const fileToUpload = event.target.files[0];
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('upload_preset', process.env.REACT_APP_PRESET);
      let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
  
      try {
        const response = await axios.post(postUrl, formData);
        // Make sure the state is updated correctly
        setImagePath(response.data.url);
      } catch (error) {
        console.log('Error:', error);
        alert('Something went wrong');
      }
    } else {
      alert('Please select an image');
    }
  }

  const sendPhotoToServer = (event) => {
    event.preventDefault();
    // Send image path to YOUR server 
    axios.post(`/api/recipe/picture/${recipeID}`, { path: imagePath })
         .then((response) => {
          //clear image
          setImagePath('');
         })
         .catch((error) => {
           console.error(error);
           alert('Something went wrong!')
         })
  }


  return (
    <div id="container">
      <header>
        <h1>Image Upload with Cloudinary</h1>
      </header>
      <h2>Upload Image</h2>
      <form onSubmit={sendPhotoToServer}>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <br />
        
        { // image preview
          imagePath === '' ? (
            <p>Please select an image</p>
          ) : (
            <img style={{ maxWidth: '150px' }} src={imagePath} />
          )
        }
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default AddImage