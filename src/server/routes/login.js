import * as db from '../db/database.js'

export const loginUser = async (req, res) =>{
	const { username, password } = req.body

	// The base response json
	let response = {
		status: "Error",
		message: "How tf did you get to here?"
	}

	// Check if username and password are provided
	// If not return an error
	if (!username || !password) {
		response = {
			status: "Error",
			message: "Username and password required"
		}
		res.send(response)
		return response
	}

	// Check if the user exists
	const { rows: users } = await db.query(`select * from users where username = '${username}'`)
	console.log(users)
	if (users.length === 0) {
		response = {
			status: "Error",
			message: "User does not exist"
		}
		res.send(response)
		return response
	}

	// Check if the provided password is the same as the one in the database
	const usersPassword = users[0].password
	if (usersPassword !== password) {
		response = {
			status: "Error",
			message: "Incorrect password"
		}
		res.send(response)
		return response
	} else {
		response = {
			status: "Success",
			message: "Login successful"
		}
		res.send(response)
		return response
	}

}
