import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import WebcamCapture from '../WebcamCapture';
import { useAuth } from '../../utils/context/authContext';
import { createHike, updateHike } from '../../api/hikesData';
import { getBoards } from '../../api/boardsData';

const initialState = {
  name: '',
  image: '',
  description: '',
  link: '',
  defaultValue: '',
};

function HikeForm({ hikeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [board, setBoard] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hikeObj.firebaseKey) {
      updateHike(formInput)
        .then(() => router.push(`/hike/${hikeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, time: new Date().toLocaleString() };
      createHike(payload, board).then(() => {
        router.push('/boards');
      });
    }
  };
  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3>Hike Form</h3>
        <div className="liveCam" id="cam"><WebcamCapture /></div>
      </div>

      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Hike Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter Hike Title" name="name" value={formInput.name} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Hike Image or Video" className="mb-3">
            <Form.Control type="url" placeholder="Enter hike image Url" name="image" value={formInput.image} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Hike Description" className="mb-3">
            <Form.Control type="text" placeholder="Enter description" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput3" label="Link for more info" className="mb-3">
            <Form.Control type="url" placeholder="Enter Url" name="link" value={formInput.link} onChange={handleChange} required />
          </FloatingLabel>

          <Form.Select
            className="mb-3"
            aria-label="Board"
            name="board_id"
            onChange={handleChange}
            required
          >
            <option value="default">Save to which board?</option>
            {
            board.map((boards) => (
              <option
                key={boards.firebaseKey}
                value={boards.firebaseKey}
                defaultValue={boards.firebaseKey === hikeObj.board_id}
              >
                {boards.boardName}
              </option>
            ))
          }
          </Form.Select>
          <Button variant="secondary" type="submit">{hikeObj.firebaseKey ? 'Update' : 'Create'} Hike</Button>
        </Form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}

HikeForm.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    board_id: PropTypes.string,
  }),
};

HikeForm.defaultProps = {
  hikeObj: initialState,
};

export default HikeForm;
