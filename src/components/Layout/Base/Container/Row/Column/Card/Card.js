import React from "react";
import "./Card.css";

const Card = (props) => (
  <div 
    className="card" 
    value={props.id} 
    onClick={() => props.handleClick(props.id)}
  >
    <div className="img-container">
      <img alt={props.id} src={props.image} />
    </div>
  </div>
);

export default Card;