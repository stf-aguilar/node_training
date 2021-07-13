const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = async (req, res = response) => {
    //const { q, nombre, page } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const queryEstado = { estado: true };

    //const usuarios = await Usuario.find(queryEstado)
    //    .skip( Number(desde))
    //    .limit( Number(limite));
    
    //const total = await Usuario.countDocuments(queryEstado);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(queryEstado),
        Usuario.find(queryEstado)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
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

const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra la base de datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario)
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    
    //Físicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false} );

    res.json(usuario);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}