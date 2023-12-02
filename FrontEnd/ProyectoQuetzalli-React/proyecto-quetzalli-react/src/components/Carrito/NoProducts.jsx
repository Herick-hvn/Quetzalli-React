import React from "react";
import Bag from "./Bag";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const NoProducts = () => {
    const navigate = useNavigate();

    const onChangePage = () => navigate('/')
  return (
    <>
      <div className="container-fluid mt-3">
        <div className="">
          <div className="card">
            <div className="card-body text-center">
              <Bag />
              <p>Tu carrito no tiene productos</p>
              <div className="d-grid gap-2 col-6 mx-auto">
              <button
                    type="button"
                    className="btn custom-button"
                    onClick={onChangePage}
                  >
                    Explorar Productos
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoProducts;
