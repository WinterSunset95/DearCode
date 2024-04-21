import * as db from '../db/database.js'

export const signupUser = async (req, res) => {

	const { username, password } = req.body

	if (!username || !password) {
		res.send ({
			status: "Error",
			message: "Username and password required"
		})
		return
	}

	let response = {
		status: "Error",
		message: "How tf did you get to here?"
	}

	try {
		// Check if username and password are provided
		if (!username || !password) {
			response = {
				status: "Error",
				message: "Username and password required"
			}
			res.send(response)
			return response
		}

		// Check if user already exists
		const { rows: users } = await db.query(`select * from users where username='${username}'`)
		if (users.length > 0) {
			response = {
				status: "Error",
				message: "User already exists"
			}
			res.send(response)
			return response
		}

		// Sign the user up
		const currentDate = new Date()
		const result = await db.query(`insert into users (username, password, created_at) values ('${username}', '${password}', '${currentDate.toISOString()}')`)
		if (result.rowCount > 0) {
			response = {
				status: "Success",
				message: "User created"
			}
			res.send(response)
			return response
		} else {
			response = {
				status: "Error",
				message: "Error creating user"
			}
			res.send(response)
			return response
		}

	} catch (err) {
		response = {
			status: "Error",
			error: err
		}
		res.send(response)
		return response
	}

}
