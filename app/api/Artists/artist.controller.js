const artistModel = require("./artist.model.js");
const artistsModel = require("./artist.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MODULES, ac } = require("../../utils/accessControl.js");
const multer = require("multer");
const storage = multer.memoryStorage(); // Almacenar las imágenes en memoria
const upload = multer({ storage: storage });

const getArtists = async (req, res, next) => {
  try {
    // const { role } = req;
    // let permission = ac.can(role).readAny(MODULES.get_artists);

    // if (!permission.granted) {
    //   return next({ name: "Permission" });
    // }

    const artists = await artistsModel
      .find({
        role: { $ne: "Client" },
      })
      .sort({ updatedAt: -1 });

    if (artists) {
      return res.status(200).json(artists);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getArtistById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_artist_by_id);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }
    const artist = await artistsModel.findById(id);

    if (artist) {
      return res.status(200).json(artist);
    } else {
      return res.status(400).json(["The artist does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerArtist = async (req, res, next) => {
  const {
    name,
    lastName,
    cellphone,
    artistName,
    secondaryArtistName,
    shortDescription,
    description,
    primaryImage,
    secondaryImage,
    soundCloud,
    instagram,
    youtube,
    spotify,
    soundCloudSecondary,
    instagramSecondary,
    youtubeSecondary,
    spotifySecondary,
    eventDate,
  } = req.body;

  console.log(req.body);

  try {
    let permission = ac.can(req.role).createAny(MODULES.register_artist);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const artistCellphoneRegistered = await artistsModel.findOne({ cellphone });

    if (!artistCellphoneRegistered) {
      // Manejar la carga de las imágenes utilizando multer

      // Crear un nuevo artista con los datos recibidos
      const newArtist = new artistsModel({
        name,
        lastName,
        cellphone,
        artistName,
        secondaryArtistName,
        shortDescription,
        description,
        primaryImage,
        secondaryImage,
        soundCloud,
        instagram,
        youtube,
        spotify,
        soundCloudSecondary,
        instagramSecondary,
        youtubeSecondary,
        spotifySecondary,
        eventDate,
      });

      // Guardar el nuevo artista en la base de datos
      await newArtist.save();

      return res
        .status(200)
        .json({ message: "Artista registrado exitosamente" });
    } else {
      return res
        .status(400)
        .send({ message: "Este número de celular ya está registrado" });
    }
  } catch (error) {
    next(error);
  }
};

const loginArtist = async (req, res, next) => {
  // const { email, password } = req.body;
  // try {
  //   const artist = await artistsModel.findOne({
  //     email,
  //   });
  //   if (artist) {
  //     await bcrypt.compare(password, artist.password, function (err, result) {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       if (result) {
  //         let artistForJwt = {
  //           id: artist._id,
  //           email: artist.email,
  //           role: artist.role,
  //           name: artist.name,
  //           lastName: artist.lastName,
  //         };
  //         const jwtToken = jwt.sign(artistForJwt, process.env.JWT_SECRET, {
  //           expiresIn: "12h",
  //         });
  //         return res.status(200).send({ ...artistForJwt, token: jwtToken });
  //       } else {
  //         return res.status(400).json({ error: "Wrong email or password." });
  //       }
  //     });
  //   } else {
  //     return res.status(400).json({ error: "Unregistered artist." });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

const editArtist = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    cellphone,
    artistName,
    secondaryArtistName,
    shortDescription,
    description,
    primaryImage,
    secondaryImage,
    soundCloud,
    instagram,
    youtube,
    spotify,
    soundCloudSecondary,
    instagramSecondary,
    youtubeSecondary,
    spotifySecondary,
    eventDate,
  } = req.body;
  console.log("djkandkjnaskjdjks");
  console.log(req.body);
  try {
    let permission = ac.can(req.role).updateAny(MODULES.edit_artist);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const ArtistCheckCellphone = await artistsModel.findOne({ cellphone });

    const artist = await artistsModel.findById(id);

    if (cellphone !== artist.cellphone) {
      if (ArtistCheckCellphone) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }
    }

    const artistUpdated = await artistModel.findByIdAndUpdate(
      id,
      {
        name,
        lastName,
        cellphone,
        artistName,
        secondaryArtistName,
        shortDescription,
        description,
        primaryImage,
        secondaryImage,
        soundCloud,
        instagram,
        youtube,
        spotify,
        soundCloudSecondary,
        instagramSecondary,
        youtubeSecondary,
        spotifySecondary,
        eventDate,
      },
      {
        new: true,
      }
    );

    return res.status(200).json([artistUpdated, "Artist updated"]);
  } catch (error) {
    next(error);
  }
};

const disableArtist = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { role } = req;
    let permission = ac.can(role).deleteAny(MODULES.disable_artist);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    await artistsModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    return res.status(200).json(["Artist Disabled."]);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerArtist,
  loginArtist,
  editArtist,
  disableArtist,
  getArtists,
  getArtistById,
};
