import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { createProduct } from "../services/createProduct";
import { CreateProductModalProps } from "../interfaces/createProductModalProps"; 



const CreateProductModal: React.FC<CreateProductModalProps> = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  
  const [errors, setErrors] = useState<string[]>([]);

  
  const validateForm = () => {
    const validationErrors: string[] = [];
    if (!title.trim()) validationErrors.push("El título es obligatorio.");
    if (!slogan.trim()) validationErrors.push("El slogan es obligatorio.");
    if (!description.trim()) validationErrors.push("La descripción es obligatoria.");
    if (!categories.trim()) validationErrors.push("Las categorías son obligatorias.");
    if (!image.trim()) validationErrors.push("La URL de la imagen es obligatoria.");
    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = {
      title,
      slogan,
      description,
      image,
      categories: categories.split(",").map((cat) => cat.trim()),  
      createdAt: new Date().toISOString(),
      reviews: [],  
    };

    try {
      await createProduct(newProduct);
      console.log("Product created successfully!");
      
      
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlogan("");
    setDescription("");
    setCategories("");
    setImage("");
    setErrors([]);
  };

  
  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors.length > 0 && (
          <Alert variant="danger">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduce el título del producto"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Slogan</Form.Label>
            <Form.Control
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Introduce el slogan del producto"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Introduce la descripción del producto"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categorías (separadas por comas)</Form.Label>
            <Form.Control
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Introduce las categorías separadas por comas"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Introduce la URL de la imagen"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crear Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProductModal;
