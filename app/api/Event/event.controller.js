const artistModel = require("./artist.model.js");
const artistsModel = require("./artist.model.js");
const { MODULES, ac } = require("../../utils/accessControl.js");

const getArtists = async (req, res, next) => {
  try {
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
    eventDate,
    organization,
  } = req.body;

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
        eventDate,
        organization,
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
    organization,
  } = req.body;
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
        organization,
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

const disableOrActiveArtist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.disable_or_active_artist);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const artist = await artistModel.findById(id);

    if (artist.status === "active") {
      artist.status = "disabled";
    } else {
      artist.status = "active";
    }

    await artist.save();

    return res
      .status(200)
      .json([
        artist.status === "active" ? "Artist Actived." : "Artist Disabled.",
      ]);
  } catch (error) {
    next(error);
  }
};

const archiveOrShowArtist = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { role } = req;
    let permission = ac.can(role).deleteAny(MODULES.archive_or_show_artist);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const artist = await artistModel.findById(id);

    if (artist.status !== "archived") {
      artist.status = "active";
    } else {
      artist.status = "archived";
    }

    await artist.save();

    return res
      .status(200)
      .json([
        artist.status === "active" ? "Artist Actived." : "Artist Disabled.",
      ]);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerArtist,
  editArtist,
  disableOrActiveArtist,
  getArtists,
  getArtistById,
  archiveOrShowArtist,
};
