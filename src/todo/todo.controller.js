const service = require('./todo.service')
const db = require('../db/connection')

async function list(req, res, next) {
    const data = await service.list(db)
    res.status(200).json(data)
}


function create(res, res) {
    
}

function update(res, res) {

}

function read(res, res) {
    
}

function destroy(res, res) {
    
}


module.exports = {
    list,
    create,
    update,
    read,
    destroy,
}