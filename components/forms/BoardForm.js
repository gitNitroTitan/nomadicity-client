import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBoard, updateBoard } from '../../api/boardsData';

const initialState = {
  title: '',
  image_url: '',
  description: '',
};

function BoardForm({ boardObj }) {
  // const [boards, setBoards] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getBoards().then(setBoards);
    if (boardObj.id) setFormInput(boardObj);
  }, [boardObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.warn(boards);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (boardObj.id) {
      updateBoard(formInput, boardObj.id, user)
        .then(() => router.push('/boards'));
    } else {
      createBoard(formInput).then(() => {
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

          <Button variant="secondary" type="submit">{boardObj.id ? 'Update' : 'Create'} Board</Button>
        </Form>
      </div>
      <div className="card-footer text-muted">
        NOMADICITY &#8482;
      </div>
    </div>
  );
}

BoardForm.propTypes = {
  // user: PropTypes.shape({
  //   uid: PropTypes.string,
  // }).isRequired,
  boardObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
  }),
};

BoardForm.defaultProps = {
  boardObj: initialState,
};

export default BoardForm;
