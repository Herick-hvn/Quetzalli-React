import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enviarDatos(formData);
      window.location.href = '/';
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const enviarDatos = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Enviando datos:', data);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="container" style={{ fontFamily: "serif"}}>
      <div className="row" style={{ marginLeft:'200px',marginTop:'20px'}}>
        <div className="col-md-6">
          {/* Imagen con tamaño ajustado */}
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <img src="src\img\Quetzal.png" alt="Imagen de contacto" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </div>
        <div className="col-md-6">
        <div style={{marginBottom:'10'}}>
            <h1>Contactanos</h1>
        </div>
          {/* Formulario de contacto */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" style={{backgroundColor:'black', marginBottom:'black'}}>
              Enviar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
