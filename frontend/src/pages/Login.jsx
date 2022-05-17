import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-form-login text-center">
      <Row>
        <Col lg={4}>
          <h1 className="h1-form-login">Login</h1>
          <p className="lead form-login">
            Connect yourself and get some fabulous pieces of art !
          </p>
        </Col>
        <Col>
          <br />
          <Form onSubmit={handleSubmit}>
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
            <Button variant="dark" type="submit">
              Validate
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
