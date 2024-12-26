
import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import CustomNavbar from "../../../shared/components/navbar";
import CreateProductModal from "../components/createProductModal";

const CreateProductPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleModalOpen = () => setShowCreateModal(true);
  const handleModalClose = () => setShowCreateModal(false);

  return (
    <div>
      <CustomNavbar showSearch={false} />
      <div>
        <Container>
          <h1 className="my-4">My products & launches</h1>
          <Row>
            <Col md={4}>
              <h5>LAUNCHES</h5>
              <ListGroup>
                <ListGroup.Item action>💯 All </ListGroup.Item>
                <ListGroup.Item action>🔥 In Progress </ListGroup.Item>
                <ListGroup.Item action>📄 Drafts </ListGroup.Item>
                <ListGroup.Item action>⏰ Scheduled </ListGroup.Item>
                <ListGroup.Item action>📅 Coming soon teaser</ListGroup.Item>
                <ListGroup.Item action>🚀 Posted </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={8}>
              <Card className="text-center">
                <Card.Body>
                  <Button variant="primary" onClick={handleModalOpen}>
                    Create a new post
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <CreateProductModal
          show={showCreateModal}
          handleClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default CreateProductPage;