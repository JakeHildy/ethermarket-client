import axios from 'axios';

export function deleteImage(imagePath) {
  const imageName = imagePath.split('.com/')[1];
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_UPLOAD_EP}/${imageName}`)
      .then(resolve)
      .catch(reject);
  });
}
