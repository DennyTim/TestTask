import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <section className="main">
      <div className="container">
        <h1 className="main-header">Get started</h1>
        <p className="main-description">Choose below what you want</p>
        <div className="btns">
          <Link to='/menu' className="main-btn btn-green">search</Link>
          <Link to='/import' className="main-btn btn-blue">upload</Link>
        </div>
      </div>
    </section>
  )
}

export default Main;
