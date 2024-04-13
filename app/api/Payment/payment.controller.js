const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-6828749209662679-041212-c366caefca4c9d43cc92a12bdfdb6ff1-525781070",
});

const createPreference = async (req, res) => {
  const preference = new Preference(client);
  const {
    quantity,
    price,
    amount,
    description,
    completeName,
    email,
    cellphone,
  } = req.body;
  try {
    preference
      .create({
        body: {
          items: [
            {
              title: description,
              quantity: Number(quantity),
              unit_price: Number(price),
            },
          ],
        },
      })
      .then((response) => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch((response) => console.log(response));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPreference,
};
