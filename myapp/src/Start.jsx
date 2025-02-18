import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

function Start() {
  const videoSrc = "/1234.mp4";
  return (
    <div className="start-page">
      <video autoPlay muted loop className="background-video">
        <source src="1234.mp4" type="video/mp4" />
      </video>
      <h1 className="welcome-text">WELCOME TO WATER TRACKER</h1>
      <div className="start-container">
        <p>Water detection and tracking involve monitoring water consumption to ensure
             adequate hydration for optimal health. This process uses various techniques
              and tools, both traditional and technological, to measure, analyze, and 
              improve water intake. Understanding the essentials of water tracking helps
               highlight its importance for human health.</p>
        <hr/>
        <div className="button-container">
          <Link to='/Login'>
            <button type='button' className="outerbuttons">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;