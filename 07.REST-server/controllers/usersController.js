const { response } = require('express');

const usersGet = (req, res = response) => {
    res.json({
        msj: 'get API - controllers'
    })
}

const usersPost = (req, res = response) => {
    res.json({
        msj: 'post API - controllers'
    })
}

const usersPut = (req, res = response) => {
    res.json({
        msj: 'put API - controllers'
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