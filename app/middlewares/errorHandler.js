module.exports = (error, req, res, next) => {
  console.log("---ERROR HANDLER---");
  console.log("NOMBRE DE ERROR", error.name);
  console.log("ERROR", error);

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors);
    const response = [];
    const path = {};

    errors.map((e) => {
      response.push(e.message);
      path[e.path] = true;
    });

    return res.status(400).send([response, path]);
  }

  if (error.name === "Permission") {
    return res
      .status(500)
      .json({ error: "No tienes permiso para realizar esta acción." });
  }

  if (error.name === "CastError") {
    return res.status(400).send([[`Invalid Data, ${error.path}`]]);
  }

  return res.status(500).send({ error: "Internal server error" });
};
