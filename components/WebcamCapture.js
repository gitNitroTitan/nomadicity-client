/* eslint-disable @next/next/no-img-element */
import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

export default function WebcamCapture() {
  const webcamRef = useRef();
  const [imgSrc, setImgSrc] = useState();
  const [cldData, setCldData] = useState();
  const src = cldData?.secure_url || imgSrc;

  const handleCapture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    console.warn(image);
    setImgSrc(image);
  }, [webcamRef, setImgSrc]);

  const reset = () => {
    setImgSrc(undefined);
  };

  useEffect(() => {
    if (!imgSrc) return;
    (async function Run() {
      const response = fetch('../api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({
          image: imgSrc,
        }),
      }).then((r) => r.json());
      setCldData(response);
      console.warn('response', response);
    }());
  }, [imgSrc]);

  return (
    <>
      {src && (
        <img
          className="imageCapture"
          src={src}
          alt="webcam capture"
        />
      )}
      {!src && (
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      )}
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
    </>
  );
}
