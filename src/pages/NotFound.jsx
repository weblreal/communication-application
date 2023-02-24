import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout();
  });

  return (
    <main>
      <h1>
        PAGE NOT FOUND <span>redirecting to Welcome page...</span>
      </h1>
      <h1>{countdown}</h1>
    </main>
  );
}
