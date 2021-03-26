import React from "react";
import "./Header.css";

const Header = (props) => (
    <header className="fixed-top p-2 px-5 border-bottom border-warning d-flex justify-content-between">
        <a href="index.html" className="h1">Clicky Cards</a>
        <h3 class="text-info mb-0 mt-2">{props.rightWrong}</h3>
    </header> 
);

export default Header;