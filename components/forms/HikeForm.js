import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createHike, updateHike } from '../../api/hikesData';

const initialState = {
  name: '',
  image: '',
  description: '',
  link: '',
};

function HikeForm({ obj, board }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateHike(formInput)
        .then(() => router.push(`/hike/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, user: user.handle, time: new Date().getTime() };
      createHike(payload, board).then(() => {
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
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Hike Title
              <input type="text" id="hike-name" className="form-control" placeholder="Title of Hike" name="name" value={formInput.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Hike Image or Video
              <input type="url" id="image-url" className="form-control" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Hike Description
              <input type="text" id="hike-desc" className="form-control" placeholder="Describe your hike" name="description" value={formInput.description} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Destination link
              <input type="url" id="dest-url" className="form-control" placeholder="Enter a destination url" name="link" value={formInput.link} onChange={handleChange} required />
            </label>
          </div>
          <div className="btn-group-vertical">
            <button type="submit" className="btn btn-dark">{obj.firebaseKey ? 'Update' : 'Create'} Hike</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}
HikeForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  board: PropTypes.string,
};

HikeForm.defaultProps = {
  obj: initialState,
  board: '',
};

export default HikeForm;
