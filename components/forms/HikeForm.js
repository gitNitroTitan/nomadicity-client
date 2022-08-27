import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createHike, updateHike } from '../../api/hikesData';

const initialState = {
  name: '',
  image: '',
  description: '',
  link: '',
};

function HikeForm({ hikeObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
        .then(() => router.push(`/hikes/${hikeObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, user: user.uid };
      createHike(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <div className="card text-center text-dark bg-light mb-3">
      <div className="card-header">
        Hike Form
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
  }),
  // board: PropTypes.string,
};

HikeForm.defaultProps = {
  hikeObj: initialState,
  // board: '',
};

export default HikeForm;
