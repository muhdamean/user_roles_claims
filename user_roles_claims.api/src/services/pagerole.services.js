const pool = require('../config/db')

const createPage =async (req, res) => {
	let name = req.body?.name;
    let description= req.body.description;
    pool.query('insert into pages(name, description) values($1, $2) RETURNING *',
        [name, description], (error, results) => {
        if (error) {
            res.status(400).send({ message: 'Error creating page', error: error });
        }

        if(results.rows && results.rows.length>0){
            let newPage= results.rows;
            res.status(200).send(newPage)
        }else{
            res.status(204).send([])
        }
    })

}

const getPages = async (req, res) => {
	pool.query('select distinct * from pages',
        (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        if (results.rows && results.rows.length > 0) {
                res.status(200).send({pages: results.rows});
        }else{
            res.status(401).send({message: 'No record found'})
        }
    })
}


//ROLES
const createRole =async (req, res) => {
	let role = req.body?.role;
    let status= req.body.status;
    pool.query('insert into roles(role, status) values($1, $2) RETURNING *',
        [role, status], (error, results) => {
        if (error) {
            res.status(400).send({ message: 'Error creating role', error: error });
        }

        if(results.rows && results.rows.length>0){
            res.status(200).send(results.rows)
        }else{
            res.status(204).send([])
        }
    })

}

const getRoles = async (req, res) => {
	pool.query('select distinct * from roles',
        (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        if (results.rows && results.rows.length > 0) {
                res.status(200).send({pages: results.rows});
        }else{
            res.status(401).send({message: 'No record found'})
        }
    })
}

module.exports = {
	createPage,
	createRole,
    getPages,
    getRoles
};