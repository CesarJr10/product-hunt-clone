import { Alert } from "react-bootstrap";

export const WelcomeAlert = () => {
  return (
    <Alert variant="success" dismissible className="my-2" >
      <Alert.Heading>Welcome to Product Hunt! 👋</Alert.Heading>
      <p>The place to launch and discover new tech products. Take a tour.</p>
    </Alert>
  );
};
