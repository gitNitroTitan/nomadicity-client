/* eslint-disable @next/next/no-img-element */
// import React, { useRef, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import Webcam from 'react-webcam';
// import uploadPhoto from '../api/cloudinary';

// export default function WebcamCapture() {
//   const webcamRef = useRef();
//   const [imgSrc, setImgSrc] = useState();
//   const [url, setUrl] = useState();

//   const uploadImage = () => {
//     const payload = new FormData();
//     payload.append('file', imgSrc);
//     payload.append('upload_preset', 'lt3pfx1n');
//     payload.append('cloud_name', 'dthdp7zpl');
//     uploadPhoto(payload).then(setUrl);
//     console.warn(url);
//   };

//   const handleCapture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//   };

//   const reset = () => {
//     setImgSrc(undefined);
//   };
//   return (
//     <>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//       <Button
//         className="cam-btn"
//         onClick={() => {
//           uploadImage();
//           handleCapture();
//         }}
//       >
//         Capture
//       </Button>
//       <Button className="reset-btn" onClick={reset}>
//         Reset
//       </Button>
//       <img className="imageCapture" src={url} alt="webcam capture" />
//     </>
//   );
// }
