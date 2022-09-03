/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

export default function WebcamCapture() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const reset = () => {
    setImgSrc(undefined);
  };

  return (
    <>
      {imgSrc && (
        <img
          className="imageCapture"
          src={imgSrc}
          alt="webcam capture"
        />
      )}
      {!imgSrc && (
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      )}
      <Button
        className="cam-btn"
        onClick={capture}
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
