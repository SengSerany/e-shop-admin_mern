import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleSession,
  logout,
  resetAuthState,
} from '../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isUnlogged, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState());
  };

  useEffect(() => {
    dispatch(handleSession('profile'));
    if (isUnlogged) {
      navigate('/');
      toast.success('Your are logout !');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess && location.pathname === '/login') {
      navigate('/');
      toast.success('Welcome ! You are now logged !');
    }

    if (user.id !== null && location.pathname === '/login') {
      navigate('/');
    }

    if (isSuccess && location.pathname === '/register') {
      navigate('/login');
      toast.success('Welcome ! You are subscribe ! You can now login !');
    }

    if (user.id !== null && location.pathname === '/register') {
      navigate('/');
    }

    if (user.id === null && location.pathname === '/store' && !isUnlogged) {
      navigate('/login');
      toast.error('You must be logged');
    }

    dispatch(resetAuthState());
  }, [
    dispatch,
    isError,
    isSuccess,
    isUnlogged,
    location.pathname,
    message,
    navigate,
    user.id,
  ]);

  return (
    <header>
      <br />
      <Navbar>
        <Container>
          <Nav className="mx-auto">
            <Row>
              <Col>
                <Link
                  className="nav-link text-center"
                  to="/store"
                  eventkey="link-1"
                >
                  Store
                </Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-2">Exhibitions</Nav.Link>
              </Col>
              <Col>
                <Link className="nav-link text-center" to="/" eventkey="link-0">
                  GALLERY ADMIN
                </Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-3">About</Nav.Link>
              </Col>
              <Col>
                <Nav.Link eventkey="link-4">Contact</Nav.Link>
              </Col>
            </Row>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <br />
        <Nav className="justify-content-end" activeKey="/home">
          {user.id !== null ? (
            <>
              <Nav.Item>
                <Link to="/profile">
                  <FaUser /> {user.username}
                </Link>
              </Nav.Item>
              <Nav.Item>
                <button className="btn-logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Log out
                </button>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link to="/login" eventkey="link-login">
                  <FaSignInAlt /> Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/register" eventkey="link-register">
                  <FaUser /> Register
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
