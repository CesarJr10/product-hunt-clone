import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/context/authContext'; 
import { LoginUser } from '../services/loginUser';  

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      const { token, id, name } = await LoginUser(email, password);  
      authLogin({ token, id, name });  

      setTimeout(() => {
        navigate('/');
      }, 1000); 

    } catch (error) {
      setError((error as Error).message); 
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{height:'100vh'}} >
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-4">
                  Login
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    onClick={() => navigate('/register')}
                    className="p-0"
                  >
                    Register here
                  </Button>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
