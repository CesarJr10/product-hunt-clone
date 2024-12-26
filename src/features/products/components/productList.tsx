import React, { useState } from "react";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { Product } from "../interfaces/product";
import ProductModal from "./productModal";
import { useAuth } from "../../../shared/context/authContext";
import { useProduct } from "../context/productContext";
import { WelcomeAlert } from "./welcomeProductAlert";
import ProductLandscapes from "./productLandscapes";
import useLoadData from "../../../shared/hooks/useLoadData";
import { getProducts } from "../services/getProducts";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const { isAuthenticated } = useAuth();
  const { searchTerm } = useProduct();

  const {
    data: products,
    loading,
    error
  } = useLoadData<Product[]>(getProducts);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  const filteredProducts = (products || []).filter((product) => {
    const searchQuery = searchTerm.toLowerCase();
    const matchesName = product.title.toLowerCase().includes(searchQuery);
    const matchesCategory = product.categories.some((category) =>
      category.toLowerCase().includes(searchQuery)
    );

    return matchesName || matchesCategory;
  });

  return (
    <Container>
      {!isAuthenticated && <WelcomeAlert />}
      <Row>
        <Col sm={12} md={8} lg={8}>
          {filteredProducts.length === 0 ? (
            <div className="text-center my-4">
              No products were found for your search.
            </div>
          ) : (
            <div>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="my-2"
                  onClick={() => handleCardClick(product)}
                >
                  <Card.Body className="d-flex align-items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ height: "60px", marginRight: "10px" }}
                    />
                    <div>
                      <Card.Title className="mb-0">{product.title}</Card.Title>
                      <Card.Text className="mb-1">{product.slogan}</Card.Text>
                      <div>
                        {product.categories.map((category, index) => (
                          <Badge key={index} className="me-2">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          {selectedProduct && (
            <ProductModal
              show={modalShow}
              handleClose={handleClose}
              product={selectedProduct}
              isAuthenticated={isAuthenticated}
            />
          )}
        </Col>
        <Col sm={12} md={4} lg={4} className="my-2">
          <ProductLandscapes />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
