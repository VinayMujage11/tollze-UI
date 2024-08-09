import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TollzEComp = () => {
    const nav = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      nav('/Home2');}, 1000); 
  };

  return (
    <div className="animation-container">
      {/* <Link onClick={handleButtonClick} to="/TollzE" className='btn btn-primary btn-sm'>Lets Begin</Link> */}
      <button onClick={handleButtonClick} className='btn btn-primary btn-sm'>Welcome To Tollz-E</button>
      <div className={`car ${isAnimating ? 'animate' : ''}`} />
    </div>
  );
};

export default TollzEComp;