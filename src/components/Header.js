import React, { useState, useEffect } from "react";
import { Button, Col, Container, Navbar, Nav, Row } from "react-bootstrap";
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