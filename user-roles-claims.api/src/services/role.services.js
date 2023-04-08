const pool = require('../config/db')

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
            res.status(201).send(results.rows)
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
                res.status(200).send(results.rows);
        }else{
            res.status(204).send({message: 'No record found'})
        }
    })
}

const getUserRolesByEmail = async (req, res) => {
    let email=req.params.email;
	pool.query(`select ur.id, u.email, r."role", p."name" page, ur.creates, ur.updates, ur.deletes 
	from user_roles ur join users u on ur.email  =u.email join pages p on ur.page_id =p.id 
	join roles r on ur.role_id = r.id where u.email=$1`,[email],
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

const getUsersRoles = async (req, res) => {
	pool.query(`select ur.id, u.email, r."role", p."name" page, ur.creates, ur.updates, ur.deletes 
	from user_roles ur join users u on ur.email  =u.email join pages p on ur.page_id =p.id 
	join roles r on ur.role_id = r.id`,
        (error, results) => {
        if (error) {
            res.status(400).send(error);
        }
        if (results.rows && results.rows.length > 0) {
            console.log(results.rows, 'count', results.rowCount)
                res.status(200).send(results.rows);
        }else{
            res.status(204).send({message: 'No record found'})
        }
    })
}

const addUserToRole =async (req, res) => {
	let email = req.body?.email;
	let role= Number.parseInt(req.body?.role);
    let page=Number.parseInt(req.body?.page);
    let create= req.body.create?? null;
    let update= req.body.update?? null;
    let delet = req.body.delete ?? null;

	pool.query(`select * from user_roles where email=$1 and role_id=$2 and page_id=$3`,
     [email, role, page], (error, results) => {
		if (error) {
			res.status(400).send(error)
		}
		if (results?.rows && results?.rows?.length > 0) {
			pool.query(`update user_roles set email=$1, role_id=$2, page_id=$3, creates=$4, updates=$5, deletes=$6
             where email=$1 and role_id=$2 and page_id=$3 RETURNING *`,
				[email, role, page, create, update, delet], (error, results) => {
				if (error) {
					res.status(401).send({ message: 'Error updating user role' , error: error });
				}

				if(results?.rows && results?.rows?.length>0){
					res.status(201).send(results.rows)
				}else{
					res.status(204).send([])
				}
			})
		} else {
			pool.query(`insert into user_roles(email, role_id, page_id, creates, updates, deletes)
             values($1, $2, $3, $4, $5, $6) RETURNING *`,
				[email, role, page, create, update, delet], (error, results) => {
				if (error) {
					res.status(400).send({ message: 'Error creating user role' , error: error });
				}

				if(results?.rows && results?.rows?.length>0){
					res.status(201).send(results.rows)
				}else{
					res.status(204).send([])
				}
			})
		}
	})
}



module.exports = {
	createRole,
    getRoles,
    addUserToRole,
	getUsersRoles,
    getUserRolesByEmail
};