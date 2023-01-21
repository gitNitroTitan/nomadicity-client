/* eslint-disable @next/next/no-img-element */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
// import { format } from 'date-fns';
import {
  BsBootstrapReboot, BsCamera, BsArrowRepeat,
} from 'react-icons/bs';
import { createHike, updateHike } from '../../api/hikesData';
import { getBoards } from '../../api/boardsData';
import uploadPics from '../../api/cloudinary';
import { useAuth } from '../../utils/context/authContext';

// const initialState = {
//   id: null,
//   name: '',
//   description: '',
//   board: null,
//   user: '',
// };

function HikeForm({ hikeObj, boardId }) {
  const [formInput, setFormInput] = useState({
    id: 0,
    name: '',
    description: '',
    board: {
      id: 0,
      title: '',
    },
    user: {
      id: 0,
      uid: '',
    },
  });
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [status, setStatus] = useState();
  const webcamRef = useRef();
  const [imageSrc, setImageSrc] = useState();
  const [url, setUrl] = useState();
  const router = useRouter();
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';
  const videoConstraints = {
    facingMode: FACING_MODE_USER,
  };
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  useEffect(() => {
    getBoards().then(setBoards);
    if (hikeObj?.id) setFormInput(hikeObj);
  }, [hikeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadImage = () => {
    const imageSource = webcamRef.current?.getScreenshot();
    setImageSrc(imageSource);
    const payload = new FormData();
    payload.append('file', imageSource);
    payload.append('upload_preset', 'lt3pfx1n');
    payload.append('cloud_name', 'dthdp7zpl');
    uploadPics(payload).then(setUrl);
  };
  const reset = () => {
    setImageSrc(undefined);
  };

  function getLocation() {
    if (!navigator.geolocation) {
      setStatus('Your browser sucks and doesnt support geolocation');
    } else {
      setStatus('Located...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('Ready');
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus('Have not located yet');
        },
      );
    }
  }

  const handleSwitch = useCallback(() => {
    setFacingMode(
      (prevState) => (prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER),
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hikeObj?.id) {
      updateHike(formInput, hikeObj.id, user, boardId).then(() => router.push('/hikes'));
    } else {
      createHike(user.id, formInput, latitude, longitude, url).then(console.warn(user)).then(() => {
        router.push('/hikes');
      });
    }
  };

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Hike Form </h3>
        <div className="liveCam" id="cam">
          {imageSrc && (
          <img src={imageSrc} alt="snap" />
          )}
          {!imageSrc && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode,
            }}
          />
          )}
          <div className="btn-switch">
            <Button className="switch-cam" onClick={handleSwitch}><h3><BsArrowRepeat /></h3></Button>
          </div>
          <div className="cam-buttons">
            <Button
              className="cam-btn"
              onClick={() => {
                uploadImage();
                getLocation();
              }}
            >
              <h3><BsCamera />
              </h3>
            </Button>
            <Button className="reset-btn" onClick={reset}><h3><BsBootstrapReboot /></h3>
            </Button>
          </div>
          <h5>{status}</h5>
        </div>

        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput1" label="Hike Title" className="mb-3">
              <Form.Control type="text" placeholder="Enter Hike Title" name="name" value={formInput.name} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput2" label="Hike Image" className="mb-3">
              <Form.Control type="url" placeholder="Enter hike image Url" name="url" value={formInput.id ? formInput.url : url} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Hike Description" className="mb-3">
              <Form.Control type="text" placeholder="Enter description" name="description" value={formInput.description} onChange={handleChange} required />
            </FloatingLabel>
            <h5>
              Latitude: {formInput.latitude}, Longitude: {formInput.longitude}
            </h5>
            <Form.Select className="mb-3" aria-label="Board" name="boardId" onChange={handleChange} required>
              {formInput.id ? <option value="">{formInput.board.title}</option> : <option value="">Select Board</option>}
              {
            boards.map((board) => (
              <option
                key={board.id}
                value={board.id}
                selected={board.id === formInput.boardId}
              >
                {board.title}
              </option>
            ))
          }
            </Form.Select>
            <Button className="btn-submit" variant="secondary" type="submit">
              {formInput.id ? 'Update' : 'Create'} Hike
            </Button>
          </Form>
        </div>
        <div className="card-footer text-muted">NOMADICITY &#8482;
        </div>
      </div>
    </div>
  );
}

HikeForm.propTypes = {
  // user: PropTypes.shape({
  //   id: PropTypes.number,
  //   uid: PropTypes.string,
  // }).isRequired,
  hikeObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      profile_image_url: PropTypes.string,
      email: PropTypes.string,
    }),
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    board: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      image_url: PropTypes.string,
    }),
  }).isRequired,
  boardId: PropTypes.number.isRequired,
};

export default HikeForm;
