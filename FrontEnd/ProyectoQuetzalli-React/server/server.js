const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token:
    "TEST-3609613916570967-120517-06c82514610e7d9abab30ab804e9288e-242844120",
});

app.get("/", function (req, res) {
  res.send("Servidor funcionando");
});

app.post("/create_preference", (req, res) => {
    console.log(req.body);
  const items = req.body.map((item) => ({
    title: item.title,
    unit_price: Number(item.unit_price),
    quantity: Number(item.quantity),
  }));
  console.log(items)
  let preference = {
    items: items,
    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});
