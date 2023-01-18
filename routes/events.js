//Obtener Eventos
const { Router } = require("express");
const { check } = require("express-validator");

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/events");
const isDate = require("../helpers/isDate");
const { validateError } = require("../middlewares/validate");
const { verifyToken } = require("../middlewares/verifyToken");
const router = Router();

router.use(verifyToken);

router.get("/", getAllEvents);
router.post(
  "/",
  [
    check("title", "El nombre es Obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio invalida").custom(isDate),
    check("end", "Fecha de finalizaciom invalida").custom(isDate),
    validateError,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "El nombre es Obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio invalida").custom(isDate),
    check("end", "Fecha de finalizaciom invalida").custom(isDate),
    validateError,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
