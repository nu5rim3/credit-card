import React from "react";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary-50">
      <div className="animate-bounce text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-2xl text-primary">Page Not Found</p>
      </div>
      <p className="mt-4 text-gray-500">The page you are looking for does not exist.</p>
      <Button variant="link" onClick={() => navigate('/')}>Go Back to Home</Button>
    </div>
  );
};

export default NotFoundPage;
