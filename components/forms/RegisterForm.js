import PropTypes from 'prop-types';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth'; // Update with path to registerUser

const initialState = {
  firstName: '',
  lastName: '',
  bio: '',
  profileImageUrl: '',
  email: '',
};
function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user, formData).then(() => updateUser(user.uid));
  };

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Register User</h3>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter User First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter User Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="User Bio" className="mb-3">
            <Form.Control type="text" placeholder="Enter Short Bio" name="bio" value={formData.bio} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Profile Image Url" className="mb-3">
            <Form.Control type="text" placeholder="Enter Profile Image Url" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="User Email" className="mb-3">
            <Form.Control type="text" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} required />
          </FloatingLabel>

          <Button variant="secondary" type="submit">{formData.id ? 'Update' : 'Create'} User</Button>
        </Form>
        <div className="card-footer text-muted">
          NOMADICITY &#8482;
        </div>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
