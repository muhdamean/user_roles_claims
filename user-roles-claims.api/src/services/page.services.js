const pool = require('../config/db')

const createPage =async (req, res) => {
    console.log(req.body)
	let name = req.body?.Name;
    let description= req.body.Description;
    pool.query('insert into pages(name, description) values($1, $2) RETURNING *',
        [name, description], (error, results) => {
        if (error) {
            res.status(400).send({ message: 'Error creating page', error: error });
        }

        if(results.rows && results.rows.length>0){
            let newPage= results.rows;
            res.status(201).send(newPage)
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
                res.status(200).send(results.rows);
                console.log('res ',results.rows)
        }else{
            res.status(401).send({message: 'No record found'})
        }
    })
}

module.exports = {
	createPage,
    getPages,
};