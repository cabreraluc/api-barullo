const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-6828749209662679-041212-2b33879f280380bd637ef27f9731848b-525781070",
});

const createPreference = async (req, res) => {
  const preference = new Preference(client);
  const {
    quantity,
    price,
    amount,
    description,
    name,
    lastName,
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
          payer: {
            email: email,
            name: name,
            lastName: lastName,
          },
          back_urls: {
            success: "https://www.success.com",
            failure: "https://www.failure.com",
            pending: "https://www.pending.com",
          },
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

const sendInfo = async (req, res) => {
  console.log(req.body);
};

module.exports = {
  createPreference,
  sendInfo,
};
