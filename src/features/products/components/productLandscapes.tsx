import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const ProductLandscapes = () => {
  const landscapes = [
    {
      title: "Notion Templates",
      description: "Notion templates have played an outsized role in my life. I joined the Notion team many years ago thanks to Notion template...",
      author: "Ben Lang",
      authorRole: "next play",
    },
    {
      title: "Online banking",
      description: "I’ve been a founder for the better part of twenty years now across multiple startups in different industries...",
      author: "Immhad Akhund",
      authorRole: "CEO and founder of Mercury",
    },
    {
      title: "AI Infrastructure Tools",
      description: "The generative AI landscape is evolving rapidly. New AI models, new platforms, new techniques for building AI applications...",
      author: "Kwindla Kramer",
      authorRole: "CEO of Daily.co",
    },
  ];

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>PRODUCT LANDSCAPES</Card.Header>
      <ListGroup variant="flush">
        {landscapes.map((landscape, index) => (
          <ListGroupItem key={index}>
            <h5>{landscape.title}</h5>
            <p>{landscape.description}</p>
            <small className="text-muted">{landscape.author} - {landscape.authorRole}</small>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
};

export default ProductLandscapes;