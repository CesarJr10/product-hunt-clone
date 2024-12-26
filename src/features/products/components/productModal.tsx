import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Badge, Carousel } from "react-bootstrap";
import { useAuth } from "../../../shared/context/authContext";
import { createComment } from "../services/createComment";
import { User } from "../../auth/interfaces/user";
import { ProductModalProps } from "../interfaces/productModalProps";
import useLoadData from "../../../shared/hooks/useLoadData";
import { getUsers } from "../../auth/services/getUsers";

const ProductModal: React.FC<ProductModalProps> = ({
  show,
  handleClose,
  product,
  isAuthenticated
}) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: users,
    loading: usersLoading,
    error: usersError
  } = useLoadData<User[]>(getUsers);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const onSubmit = async () => {
    if (comment.trim() !== "" && user) {
      try {
        const updatedProduct = await createComment(product.id, {
          userId: user.id,
          comment
        });
        product.reviews = updatedProduct.reviews;
        setComment("");
      } catch (error) {
        console.error("Error saving comment:", error);
      }
    } else {
      console.error("User is not authenticated or comment is empty!");
    }
  };

  const findUser = (userId: string) => users?.find((u) => u.id === userId);

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <img
          src={product.image}
          alt={product.title}
          style={{ height: "60px", display: "inline", marginRight: "5px" }}
        />
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel className="mb-3">
          <Carousel.Item>
            <img className="d-block w-100" src={product.image} alt="Product" />
          </Carousel.Item>
        </Carousel>
        <h5>{product.slogan}</h5>
        <p>{product.description}</p>
        <div>
          <p>
            Launched in&nbsp;
            {product.categories.map((category, index) => (
              <Badge key={index} bg="secondary" className="me-2">
                {category}
              </Badge>
            ))}
          </p>
        </div>

        {isAuthenticated ? (
          <Form className="mt-3">
            <Form.Group>
              <Form.Label>Leave a Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
              />
            </Form.Group>
            <Button variant="primary" className="mt-2" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        ) : (
          <Button
            variant="primary"
            className="mt-2"
            onClick={handleLoginRedirect}
          >
            Login to Comment
          </Button>
        )}

        <div className="mt-3">
          <h5>Comments</h5>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : usersError ? (
            <p>{usersError}</p>
          ) : product.reviews.length > 0 ? (
            product.reviews.map((review, index) => {
              const author = findUser(review.userId);
              return (
                <div key={index} className="mb-2 d-flex align-items-center">
                  {author && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        marginRight: "10px"
                      }}
                    />
                  )}
                  <div>
                    <strong>{author ? author.name : "Unknown User"}:</strong>{" "}
                    {review.comment}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
