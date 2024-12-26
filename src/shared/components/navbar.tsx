import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
} from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { useProduct } from "../../features/products/context/productContext"; 

const CustomNavbar: React.FC<{ showSearch?: boolean }> = ({
  showSearch = true
}) => {
  const { setSearchTerm } = useProduct(); 
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Navbar bg="light" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>
          <h3>Product Hunt</h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {showSearch && (
            <Form className="d-flex mx-auto my-2 my-lg-0">
              <FormControl
                type="search"
                placeholder="Search (ctrl + k)"
                className="me-2"
                onChange={(e) => setSearchTerm(e.target.value)} 
                aria-label="Search"
              />
            </Form>
          )}

          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')}>Launches</Nav.Link>
            <Nav.Link onClick={() => navigate('/')}>Products</Nav.Link>
            <Nav.Link onClick={() => navigate('/')}>News</Nav.Link>
            <Nav.Link onClick={() => navigate('/')}>Community</Nav.Link>
            <Nav.Link onClick={() => navigate('/')}>Advertise</Nav.Link>
          </Nav>

          <div className="d-flex ms-3">
            <Button variant="outline-primary" className="me-2">
              Subscribe
            </Button>
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Options
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/createProduct')}>My products</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={handleSignIn} variant="primary">
                Sign in
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;