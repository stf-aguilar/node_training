const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = (req, res = response) => {
    const { q, nombre, page } = req.query;
    res.json({
        msj: 'get API - controllers',
        q, 
        nombre, 
        page
    })
}

const usersPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
       usuario
    })
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msj: 'put API - controllers',
        id
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msj: 'delete API - controllers'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}