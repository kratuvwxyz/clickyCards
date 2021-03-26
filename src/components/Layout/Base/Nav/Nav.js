import React from "react";
import "./Nav.css";

const Nav = (props) => (

    <nav className="nav nav-pills nav-justified p-3 mb-5 topNav">
        <div className="nav-item nav-link ls-md">CARDS TO CLICK <span className="font-monospace">{props.cardsHit}</span></div>
        <div className="nav-item nav-link ls-md">CURRENT SCORE <span className="font-monospace">{props.score}</span></div>
        <div className="nav-item nav-link d-none d-sm-none d-md-block ls-md">TOP SCORE <span className="font-monospace">{props.topScore}</span></div>
        <div className="nav-item nav-link d-none d-sm-block ls-md">LEVEL <span className="font-monospace">{props.level}</span></div>
    </nav>
);

export default Nav;