import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createBoard, updateBoard } from '../../api/boardsData';
import { useAuth } from '../../utils/context/authContext';

function BoardForm({ boardObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({
    board: {
      id: 0,
      title: '',
    },
    user: {
      id: 0,
      uid: '',
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (boardObj?.id) setFormInput(boardObj);
  }, [boardObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardObj?.id) {
      updateBoard(formInput, boardObj.id, user)
        .then(() => router.push('/boards'));
    } else {
      createBoard(user.uid, formInput).then(() => {
        router.push('/boards');
      });
    }
  };
  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Board Form</h3>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Board Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter Board Title" name="title" value={formInput.title} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Board Image" className="mb-3">
            <Form.Control type="url" placeholder="Enter board image Url" name="image_url" value={formInput.image_url} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Board Description" className="mb-3">
            <Form.Control type="text" placeholder="Enter description" name="description" value={formInput.description} onChange={handleChange} required />
          </FloatingLabel>

          <Button variant="secondary" type="submit">{formInput.id ? 'Update' : 'Create'} Board</Button>
        </Form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}

BoardForm.propTypes = {
  boardObj: PropTypes.shape({
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
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default BoardForm;
