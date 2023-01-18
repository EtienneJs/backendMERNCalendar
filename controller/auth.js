const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body;
  try {
    let usuario = await User.findOne({ email });
    if (usuario) {
      console.log("sss");
      return res.status(401).json({
        ok: false,
        message: "Email Exists",
      });
    }
    console.log(process.env.SALT);
    const hashPass = bcrypt.hashSync(password, Number(process.env.SALT));

    const user = new User({ email, name, password: hashPass });

    await user.save();

    const token = await generateJwt(user.id, user.name);

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: "false",
      message: "Por favor hable con el Administrador",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log("sss");
      return res.status(401).json({
        ok: false,
        message: "Datos incorrectos",
      });
    }
    const descrip = bcrypt.compareSync(password, user.password);
    if (!descrip) {
      console.log("sss");
      return res.status(401).json({
        ok: false,
        message: "Datos incorrectos",
      });
    }
    const token = await generateJwt(user.id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: "false",
      message: "Por favor hable con el Administrador",
    });
  }
};
const revalidateToken = async (req, res) => {
  const uid = req.uid;
  const name = req.name;
  try {
    const token = await generateJwt(uid, name);
    return res.status(200).json({
      ok: true,
      uid,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo paso",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
