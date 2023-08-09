import React from "react";
import { Link } from "react-router-dom";
import "./css/home.css"


//import { Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';




function Homepage() {
  return (
    <html>
      <head>
        
        <title>Electricity board</title>
        <style>
  @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Jost:wght@100&family=Paytone+One&family=Radio+Canada&family=Staatliches&family=Yantramanav:wght@300&display=swap');
</style>
        
      </head>
      <body>
        <section id="bimg">
          <div className="logo"></div>
          <div className="btext">
            <p id="v">H e a l t h &nbsp;o n&nbsp; h a n d s</p>
            <h2>A J I T H &nbsp; P H A R M A C Y</h2>
            <p id="v"> Modern now and in the future</p>
          </div>
          <div className="reg">
            <Link to="/authenticate"><span></span>Login</Link>
            <a href="Registration.html"><span></span>Sign up</a>
          </div>
        </section>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
    
  );
}

export default Homepage;
