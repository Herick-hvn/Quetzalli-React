import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:7239/api/Users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del API:", data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Esperar 2 segundos
        setTimeout(() => {
          navigate("/productos");
        }, 2000);
      } else {
        console.error("Error al iniciar sesión");
        const errorData = await response.json();
        toast.error(errorData.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      toast.error("Error al realizar la solicitud", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <img
              src="src\img\logoSinFondo.png"
              alt="Imagen"
              className="logo-image"
            />
          </div>
          <div className="col-lg-6 d-flex ">
            <div className="card-container">
              <h2 style={{ textAlign: "center" }}>Formulario</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    placeholder="ejemplo@gmail.com"
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    placeholder="contraseña"
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-login">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
