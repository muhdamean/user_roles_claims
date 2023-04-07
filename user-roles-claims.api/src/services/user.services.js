const pool = require('../config/db')

const register =async (req, res) => {
	let email = req.body?.email;
	pool.query(`select * from users where email=$1`, [email], (error, results) => {
		if (error) {
			res.status(400).send(error)
		}
		if (results.rows && results.rows.length > 0) {
			res.status(400).send({ message: 'Already exists' });
		} else {
			pool.query('insert into users(email) values($1) RETURNING *',
				[email], (error, results) => {
				if (error) {
					res.status(400).send({ message: 'Error creating user', error: error });
				}

				if(results.rows && results.rows.length>0){
					let newUser= results.rows;
					res.status(200).send(newUser)
				}else{
					res.status(204).send([])
				}
			})
		}
	})


}

const login = async (req, res) => {
	const email = req.body.email;
	pool.query('select ur.id, u.email, r."role", p."name" page, ur."create", ur."update", ur."delete"  from user_roles ur join users u on ur.user_id =u.id join pages p on ur.page_id =p.id join roles r on ur.role_id = r.id where u.email = $1', [email],
		 (error, results) => {
			if (error) {
				res.status(400).send(error);
			}
			if (results.rows && results.rows.length > 0) {
				let loggedInUser= [];
				
                loggedInUser.email=results.rows[0].email;
                loggedInUser.phone=results.rows[0].phone;
                loggedInUser.department=results.rows[0].department;
                loggedInUser.gender=results.rows[0].gender;
                loggedInUser.status=results.rows[0].status;

					res.status(200).send({user:loggedInUser});
			}else{
				res.status(401).send({message: 'Invalid login details'})
			}
		})
}

module.exports = {
	register,
	login,
};