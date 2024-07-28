import React from 'react';
import { useAuth } from '../context/AuthContext';
import HomeContent from '../components/HomeContent';
import Login from '../components/Login';


const Home: React.FC = () => {

  const { isAuthenticated } = useAuth();

  return (
    <div className="main-page-wrapper">
      {isAuthenticated ? <HomeContent /> : <Login />}
    </div>
  );
};

export default Home;