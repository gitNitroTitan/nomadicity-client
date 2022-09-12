/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

export default function WebcamCapture() {
  const webcamRef = useRef();
  const [imgSrc, setImgSrc] = useState();

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const reset = () => {
    setImgSrc(undefined);
  };
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button
        className="cam-btn"
        onClick={handleCapture}
      >Capture
      </Button>
      <Button
        className="reset-btn"
        onClick={reset}
      >Reset
      </Button>
      {imgSrc && (
        <img
          className="imageCapture"
          src={imgSrc}
          alt="webcam capture"
        />
      )}
    </>
  );
}
