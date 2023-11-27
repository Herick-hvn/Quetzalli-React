import React from "react";
import NavBar from "../../components/NavBarPrincipal/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Productos from "../../pages/Dashboard/CatalogoProductos/Productos";

const Dashboard = () => {
  //Pagina donde se muestran los modulos despues de iniciar sesion
  return (
    <>
      <NavBar />
      <Productos />
    </>
  );
};

export default Dashboard;
