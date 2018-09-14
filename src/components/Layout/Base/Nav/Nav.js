import React from "react";
import "./Nav.css";

const Nav = (props) => (

    <nav className="nav nav-pills nav-justified p-3 mb-5 bg-info">
        <div className="nav-item nav-link">CARDS TO CLICK <span>{props.cardsHit}</span></div>
        <div className="nav-item nav-link">CURRENT SCORE <span>{props.score}</span></div>
        <div className="nav-item nav-link d-none d-sm-none d-md-block">TOP SCORE <span>{props.topScore}</span></div>
        <div className="nav-item nav-link d-none d-sm-block">LEVEL <span>{props.level}</span></div>
    </nav>
);

export default Nav;