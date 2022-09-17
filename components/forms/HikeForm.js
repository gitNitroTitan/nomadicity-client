import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useAuth } from '../../utils/context/authContext';
import { createHike, updateHike } from '../../api/hikesData';
import { getBoards } from '../../api/boardsData';
import uploadPhoto from '../../api/cloudinary';

const initialState = {
  name: '',
  url: '',
  description: '',
  link: '',
  defaultValue: '',
};

function HikeForm({ hikeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [board, setBoard] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [status, setStatus] = useState();
  const webcamRef = useRef();
  const [imageSrc, setImageSrc] = useState();
  const [url, setUrl] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBoards(user.uid).then(setBoard);
    if (hikeObj.firebaseKey) setFormInput(hikeObj);
  }, [hikeObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleCapture() {
    const imageSource = webcamRef.current.getScreenshot();
    setImageSrc(imageSource);
  }

  const reset = () => {
    setImageSrc(undefined);
  };

  const uploadImage = () => {
    const payload = new FormData();
    payload.append('file', imageSrc);
    payload.append('upload_preset', 'lt3pfx1n');
    payload.append('cloud_name', 'dthdp7zpl');
    uploadPhoto(payload).then(setUrl);
  };

  const getLocation = () => {
    // e.preventDefault();
    if (!navigator.geolocation) {
      setStatus('Your browser sucks and doesnt support geolocation');
    } else {
      setStatus('Located...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('ready to party');
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus('This aint your location');
        },
      );
    }
  };
  console.warn({ status, latitude, longitude });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hikeObj.firebaseKey) {
      updateHike(formInput).then(() => router.push(`/hike/${hikeObj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        time: new Date().toLocaleString(),
        latitude,
        longitude,
        url,
      };
      createHike(payload, board).then(() => {
        router.push('/boards');
      });
    }
  };
  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3>Hike Form</h3>
        <div className="liveCam" id="cam">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <Button
            className="cam-btn"
            onClick={() => {
              handleCapture();
              getLocation();
            }}
          >
            Capture
          </Button>
          <Button className="reset-btn" onClick={uploadImage}>
            Upload
          </Button>
          <Button className="reset-btn" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Hike Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter Hike Title" name="name" value={formInput.name} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Hike Image or Video" className="mb-3">
            <Form.Control type="url" placeholder="Enter hike image Url" name="url" value={hikeObj.firebaseKey ? hikeObj.url : url} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Hike Description" className="mb-3">
            <Form.Control type="text" placeholder="Enter description" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput4" label="Link for more info" className="mb-3">
            <Form.Control type="url" placeholder="Enter Url" name="link" value={formInput.link} onChange={handleChange} required />
          </FloatingLabel>
          <h5>
            Latitude: {formInput.latitude}, Longitude: {formInput.longitude}
          </h5>
          <Form.Select className="mb-3" aria-label="Board" name="board_id" onChange={handleChange} required>
            <option value="">Save to which board?</option>
            {
            board.map((boards) => (
              <option
                key={boards.firebaseKey}
                value={boards.firebaseKey}
                selected={hikeObj.board_id === boards.firebaseKey}
              >
                {boards.boardName}
              </option>
            ))
          }
          </Form.Select>
          <Button variant="secondary" type="submit">
            {hikeObj.firebaseKey ? 'Update' : 'Create'} Hike
          </Button>
        </Form>
      </div>
      <div className="card-footer text-muted">NOMADICITY &#8482;</div>
    </div>
  );
}

HikeForm.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    url: PropTypes.string,
    firebaseKey: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    board_id: PropTypes.string,
  }),
};

HikeForm.defaultProps = {
  hikeObj: initialState,
};
// }

export default HikeForm;
