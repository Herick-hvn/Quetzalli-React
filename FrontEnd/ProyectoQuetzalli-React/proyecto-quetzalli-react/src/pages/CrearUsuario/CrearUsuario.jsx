import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../../styles/CrearCuenta/CrearCuenta.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CrearUsuario = () => {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationData, setRegistrationData] = useState([]); // Arreglo para almacenar datos de registro

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos no nulos
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Todos los campos son obligatorios", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validación de contraseña
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Almacenar datos en el arreglo
    setRegistrationData([...registrationData, formData]);

    // Enviar datos a un servicio POST (simulado aquí)
    sendRegistrationDataToServer(formData);

    // Limpiar el formulario después de enviar
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const sendRegistrationDataToServer = async (data) => {
    try {
      // Obtén la fecha de hoy en el formato deseado (yyyy-mm-dd)
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      // Configura los datos para la solicitud POST
      const postData = {
        email: data.email,
        password: data.password,
        rol: "cliente",
        active: 0,
        confirmedAt: formattedDate,
      };

      // Realiza la solicitud POST usando fetch
      const response = await fetch("https://localhost:7239/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      // Verifica si la solicitud fue exitosa (código de estado 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        // Muestra un toast de éxito
        toast.success("La cuenta se creó exitosamente");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        // Si la solicitud no fue exitosa, lanza un error
        throw new Error(
          `Error en la solicitud: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error al enviar datos de registro:", error.message);
    }
    console.log("Enviando datos de registro:", data);
  };
  return (
    <>
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
                <h2 style={{ textAlign: "center" }}>Crear Cuenta</h2>
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
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Repita la contraseña:
                    </label>
                    <input
                      placeholder="contraseña"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-login">
                    Crear Cuenta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CrearUsuario;
