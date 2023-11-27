import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Custom/custom.css";

const FooterComponent = () => {
  return (
    <div
      className="container-fluid text-white mt-5 py-5 px-sm-3 px-md-5"
      style={{
        fontFamily:
          "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        backgroundColor: "#182F2B",
      }}
    >
      <div className="row pt-5">
        <div className="col-lg-3 col-md-6 mb-5">
          <a
            href="#"
            className="navbar-brand font-weight-bold text-primary m-0 mb-4 p-0"
            style={{ fontSize: "10px", lineHeight: "20px" }}
          >
            <img
              src="src\img\logo.ico"
              alt="Quetzalli"
              style={{ width: "200px", height: "200px" }}
            />
          </a>
          <p
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "1rem",
              letterSpacing: "1px",
              textAlign: "justify",
            }}
          >
            Explora el mundo de la elegancia en Quetzalli, la tienda de pulseras
            donde la creatividad y el estilo se unen en cada diseño. Únete a una
            comunidad que valora la belleza y la calidad artesanal en cada
            pieza.
          </p>
          <div className="d-flex justify-content-start mt-4">
            <a
              className="btn btn-outline-primary rounded-circle text-center mr-2 px-0 position-relative"
              style={{
                width: "38px",
                height: "38px",
                color: "#756539",
                border: "2px solid #756539",
                textDecoration: "none",
              }}
              href="https://twitter.com/i/flow/login?redirect_after_login=%2FUTLmex"
            >
              <FontAwesomeIcon icon={faTwitter} className="icon" />
              <span className="overlay"></span>
            </a>
            <a
              className="btn btn-outline-primary rounded-circle text-center mr-2 px-0 position-relative"
              style={{
                width: "38px",
                height: "38px",
                color: "#756539",
                border: "2px solid #756539",
                textDecoration: "none",
              }}
              href="https://www.facebook.com/UTLmex/?locale=es_LA"
            >
              <FontAwesomeIcon icon={faFacebookF} className="icon" />
              <span className="overlay"></span>
            </a>
            <a
              className="btn btn-outline-primary rounded-circle text-center mr-2 px-0 position-relative instagram-icon"
              style={{
                width: "38px",
                height: "38px",
                color: "#756539",
                border: "2px solid #756539",
                textDecoration: "none",
              }}
              href="https://www.instagram.com/utlmex/"
            >
              <FontAwesomeIcon icon={faInstagram} className="icon" />
              <span className="overlay"></span>
            </a>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 mb-5"
          style={{
            textAlign: "justify",
            fontFamily: "serif",
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "2rem",
              letterSpacing: "2px",
              color: "#756539",
            }}
          >
            Información
          </h3>

          <div className="d-flex flex-column">
            <div className="d-flex mb-3">
              <i className="bi bi-geo-fill"></i>
              <div className="pl-3">
                <h5
                  className="text-white"
                  style={{
                    textAlign: "justify",
                    fontWeight: "bold",
                    fontFamily: "serif",
                  }}
                >
                  Dirección
                </h5>
                <p
                  style={{
                    fontFamily: "serif",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                  }}
                >
                  Blvd. Universidad Tecnológica #225 Col. San Carlos CP. 37670
                  León, Gto. Mex.
                </p>
              </div>
            </div>

            <div className="d-flex">
              <i className="bi bi-star-fill"></i> {/* Icono de ejemplo */}
              <div className="pl-3">
                <h5
                  className="text-white"
                  style={{
                    textAlign: "justify",
                    fontWeight: "bold",
                    fontFamily: "serif",
                  }}
                >
                  Correo Electrónico
                </h5>
                <p
                  style={{
                    fontFamily: "serif",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                  }}
                >
                  somosquetzalli@quetzalli.com
                </p>
              </div>
            </div>
            <div className="d-flex">
              <i className="bi bi-star-fill"></i> {/* Icono de ejemplo */}
              <div className="pl-3">
                <h5
                  className="text-white"
                  style={{
                    textAlign: "justify",
                    fontWeight: "bold",
                    fontFamily: "serif",
                  }}
                >
                  Teléfono
                </h5>
                <p
                  style={{
                    fontFamily: "serif",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                  }}
                >
                  (477) 117 30 13
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 mb-5"
          style={{
            textAlign: "justify",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "2rem",
              letterSpacing: "2px",
              color: "#756539",
            }}
          >
            Enlaces rápidos
          </h3>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-white mb-2" href="">
              <i className="fa fa-angle-right mr-2"></i>Inicio
            </a>
            <a className="text-white mb-2" href="login">
              <i className="fa fa-angle-right mr-2"></i>Login
            </a>
            <a className="text-white" href="contact.html">
              <i className="fa fa-angle-right mr-2"></i>Contacto
            </a>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 mb-5"
          style={{
            textAlign: "justify",
            fontFamily:
              "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              fontSize: "2rem",
              letterSpacing: "2px",
              color: "#756539",
            }}
          >
            Recibir información
          </h3>
          <form action="" style={{ marginRight: "20px" }}>
            <div className="form-group">
              <input
                type="text"
                className="form-control border-0 py-4"
                placeholder="Nombre"
                required="required"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="email"
                className="form-control border-0 py-4"
                placeholder="Correo Electrónico"
                required="required"
              />
            </div>
            <br />
            <div>
              <button
                className="btnbtn-block text-white border-0 py-3"
                type="submit"
                style={{ backgroundColor: "#756539" }}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="container-fluid pt-5"
        style={{
          borderTop: "1px solid rgba(23, 162, 184, .2)",
          fontFamily:
            "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        <p className="m-0 text-center text-white">
          <a className="font-weight-bold" href="" style={{ color: "#756539" }}>
            Aviso de Privacidad Simplificado
          </a>
          |
          <a className="font-weight-bold" href="" style={{ color: "#756539" }}>
            Aviso de Privacidad Integral
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;
