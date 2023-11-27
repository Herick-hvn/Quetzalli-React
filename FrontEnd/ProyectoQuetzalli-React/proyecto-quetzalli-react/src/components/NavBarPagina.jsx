import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Custom/custom.css";

const NavBarPagina = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar"
      style={{ backgroundColor: "white", border: "none" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="src\img\logo.ico"
            alt="Logo"
            height="130"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: "auto" }}>
            <Nav.Link
              as={Link}
              to="/login"
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "1.2rem",
                letterSpacing: "2px",
              }}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              style={{
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "1.2rem",
                letterSpacing: "2px",
              }}
            >
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarPagina;
