const { MercadoPagoConfig, Preference } = require("mercadopago");
const qr = require("qr-image");
const nodemailer = require("nodemailer");
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
            name: name,
            surname: email,
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
  const paymentId = req.body.data.id;
  console.log(req.query["data.id"], "QUERY");
  console.log(req.body, "BODY");
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${client.accessToken}`,
        },
      }
    );
    if (response) {
      const data = await response.json();
      console.log(data);

      const qrCode = qr.imageSync(`yaestafunca`, { type: "png" });

      // Guardar en la base de datos MongoDB (asumiendo que tienes una instancia de MongoDB configurada)
      // Aquí puedes usar una librería como mongoose para interactuar con MongoDB

      // Enviar correo electrónico con el código QR adjunto
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lucasanbo@gmail.com",
          pass: "rigmuhweonsejnlj",
        },
      });

      const clientEmail = data.additional_info.items[0].last_name;

      const mailOptions = {
        from: "lucasanbo@gmail.com",
        to: clientEmail,
        subject: "Código QR de tu transacción",
        text: "Adjuntamos el código QR de tu transacción.",
        attachments: [
          {
            filename: "qr-code.png",
            content: qrCode,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado:", info.response);
        }
      });

      res.status(200).end();
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200);
};

module.exports = {
  createPreference,
  sendInfo,
};
