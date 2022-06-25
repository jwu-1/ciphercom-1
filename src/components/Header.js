import React from "react";
import { Navbar, Nav,  } from "react-bootstrap";
export default function Header(props) {
    return (
        <Navbar id="nav-bar" sticky="top">
            <Nav className="me-auto">
                <Nav.Link className="header-item" href="/">Home</Nav.Link>
                <Nav.Link className="header-item" href="/pad">Pad</Nav.Link>
            </Nav>
        </Navbar>
    )
}