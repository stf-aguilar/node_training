const { response } = require('express');

const usersGet = (req, res = response) => {
    const { q, nombre, page } = req.query;
    res.json({
        msj: 'get API - controllers',
        q, 
        nombre, 
        page
    })
}

const usersPost = (req, res = response) => {
    const { nombre, id } = req.body;

    res.json({
        msj: 'post API - controllers',
        nombre, id
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