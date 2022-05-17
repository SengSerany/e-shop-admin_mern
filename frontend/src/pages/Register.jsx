import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { register } from '../features/auth/authSlice';

function Register() {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { username, email, password, passwordConfirm } = registerData;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Password don't match");
    } else {
      const userData = {
        username,
        email,
        password,
        passwordConfirm,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-form-register text-center">
      <Row>
        <Col lg={4}>
          <h1 className="h1-form-register">Register</h1>
          <p className="lead form-login">
            Create your account and get some fabulous pieces of art !
          </p>
        </Col>
        <Col>
          <br />
          <Form className="form-register" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                value={username}
                placeholder="Enter username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirm">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Validate
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
