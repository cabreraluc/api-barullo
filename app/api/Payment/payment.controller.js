const { MercadoPagoConfig, Preference } = require("mercadopago");
const PaymentModel = require("./payment.model");
const qr = require("qr-image");
const nodemailer = require("nodemailer");

//////////////////////EN PROCESO/////////////////////////

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
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
            success: "https://www.barulloworld.com",
            failure: "https://www.barulloworld.com",
            pending: "https://www.barulloworld.com",
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
  // console.log(req.query["data.id"], "QUERY");
  // console.log(req.body, "BODY");
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

      console.log("hayrespuesta!");

      const description = data.additional_info.items[0].title;
      const clientEmail = data.additional_info.payer.last_name;

      const paymentClientExist = await PaymentModel.find({
        paymentId: paymentId,
      });

      console.log(paymentClientExist);

      if (!paymentClientExist.length) {
        console.log("paymentdontexist!");
        const newPaymentClient = await PaymentModel.create({
          name: data.additional_info.payer.first_name,
          email: clientEmail,
          description: description,
          paymentId: paymentId,
        });

        newPaymentClient.save();

        console.log(newPaymentClient);

        const qrCode = qr.imageSync(JSON.stringify(newPaymentClient), {
          type: "png",
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "barulloinc@gmail.com",
            pass: "szzhaqnibbkwhwlj",
          },
        });

        const mailOptions = {
          from: "barulloinc@gmail.com",
          to: clientEmail,
          subject: "Barullo ticket",
          text: "Muchas gracias por tu compra, adjuntamos el código QR que necesitaras para acceder al evento. La ubicación es la siguiente: https://maps.app.goo.gl/Ub4Zbu8gz4h7xaQD9",
          attachments: [
            {
              filename: "barullo_qr.png",
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
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(200);
};

const getPaymentByQr = async (req, res) => {
  const paymentId = req.params.id;
  try {
    const payment = await PaymentModel.findById(paymentId);
    if (!payment) {
      return res.status(200).json({
        message: "PAGO NO ENCONTRADO",
      });
    } else if (payment.scanned) {
      return res.status(200).json({
        message: "ESTE PAGO YA FUE ESCANEADO",
        payment,
      });
    } else {
      payment.scanned = true;
      payment.save();
      return res.status(200).json({
        message: "PAGO ENCONTRADO",
        payment,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500);
  }
};

module.exports = {
  createPreference,
  sendInfo,
  getPaymentByQr,
};

//////////////////////EN PROCESO/////////////////////////
