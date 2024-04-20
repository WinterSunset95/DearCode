import { createPool, sql } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";

export const actions = {
	default: async (event) =>{
		let response:{
			status:String,
			message:String
		} = {
			status: 'Error',
			message: 'Wtf are you doing to get this error?'
		}

		const data = await event.request.formData()
		const uname = data.get('username')
		const pass = data.get('password')
		const confirm = data.get('confirm')
		const db = createPool({ connectionString: POSTGRES_URL });

		// If the user already exists
		const { rows: queryRes } = await db.query(`select * from users where uname = '${uname}'`)
		if (queryRes.length > 0) {
			// The user exists
			response.status = 'Error'
			response.message = 'User already exists'
			return response;
		}

		// If password and confirmation password does not match
		// Set the response, and return
		if (pass != confirm) {
			response.status = 'Error'
			response.message = 'Passwords do not match'
			return response;
		}

		// The code reached upto here?? Good, that means the user 
		// is not yet signed up, and the passwords match
		// Lets sign up
		const { rowCount: count } = await db.query(`insert into users (uname, pass) values ('${uname}', '${pass}')`)
		if (count == 1) {
			// One row was inserted
			// Success
			response.status = "Success"
			response.message = "Successfully signed up"
			return response;
		}

		// If you reached this part of the code... god help you
		return response;
	}
}
