const pool = require('../config/db')


const getUsers = async (req, res) => {
	pool.query('select distinct * from users',
        (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        if (results.rows && results.rows.length > 0) {
                res.status(200).send(results.rows);
        }else{
            res.status(204).send({message: 'No record found'})
        }
    })
}

const register =async (req, res) => {
	let email = req.body?.email;
	let status= req.body?.status;
	pool.query(`select * from users where email=$1`, [email], (error, results) => {
		if (error) {
			res.status(400).send(error)
		}
		if (results.rows && results.rows.length > 0) {
			res.status(400).send({ message: 'Already exists' });
		} else {
			pool.query('insert into users(email, status) values($1, $2) RETURNING *',
				[email, status], (error, results) => {
				if (error) {
					res.status(400).send({ message: 'Error creating user', error: error });
				}

				if(results.rows && results.rows.length>0){
					res.status(201).send(results.rows)
				}else{
					res.status(204).send([])
				}
			})
		}
	})


}

const login = async (req, res) => {
	const email = req.body.email;
	pool.query('select ur.id, u.email, r."role", p."name" page, ur.creates, ur.updates, ur.deletes  from user_roles ur join users u on ur.email =u.email join pages p on ur.page_id =p.id join roles r on ur.role_id = r.id where u.email = $1', [email],
		 (error, results) => {
			if (error) {
				res.status(400).send(error);
			}
			if (results.rows && results.rows.length > 0) {
					res.status(200).send(results.rows);
			}else{
				res.status(401).send({message: 'Invalid login details'})
			}
		})
}

module.exports = {
	register,
	login,
	getUsers
};