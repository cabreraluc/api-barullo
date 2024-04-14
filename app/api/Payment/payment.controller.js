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
            surname: lastName,
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
  const paymentId = req.body.id;
  console.log(req.query, "QUERY");
  console.log(req.body, "BODY");
  try {
    // const response = await fetch(
    //   `https://api.mercadopago.com/v1/payments/${paymentId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${client.accessToken}`,
    //     },
    //   }
    // );
    // if (response) {
    //   const data = await response.json();
    //   console.log(data);
    // }
  } catch (error) {
    console.log(error);
  }

  return res.status(200);
};

module.exports = {
  createPreference,
  sendInfo,
};
