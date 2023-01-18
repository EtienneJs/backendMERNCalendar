const Events = require("../models/Events");
const ObjectId = require("mongoose");

const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().lean();
    return res.status(201).json({
      ok: true,
      events,
      msg: "Se obtuvieron todos los eventos",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

const createEvent = async (req, res) => {
  const evento = new Events(req.body);

  try {
    evento.user = req.uid;
    const event = await evento.save();
    return res.status(201).json({
      ok: true,
      msg: "Se creo un nuevo dato",
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};
const updateEvent = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  if (!ObjectId.isValidObjectId(eventoId)) {
    return res.status(404).json({
      ok: false,
      msg: "ID no valido",
    });
  }
  try {
    const event = await Events.findById(eventoId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No autorizado",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Events.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    return res.status(201).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  if (!ObjectId.isValidObjectId(eventoId)) {
    return res.status(404).json({
      ok: false,
      msg: "ID no valido",
    });
  }

  try {
    const evento = await Events.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }

    await Events.findByIdAndDelete(eventoId);

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
