import { createPool, sql } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'
import {error} from '@sveltejs/kit'

export const actions = {

	default: async (event) =>{
		const data = await event.request.formData()
		const uname = data.get('username')
		const pass = data.get('password')

		console.log(uname, pass)

		try {
			const db = createPool({ connectionString: POSTGRES_URL })
			const { rows } = await db.query(`SELECT * FROM users WHERE uname = '${uname}' and pass = '${pass}'`)

			// If the user exists, but password is wrong, it will return an empty array
			if (rows.length <= 0) {
				const data = {
					status: 'Error',
					message: 'Unknown user or password'
				}
				return data;
			} else {
				const data = {
					status: 'Success',
					user: uname,
					message: 'Login successful'
				}

				return data;

			}
		} catch (err) {
			const data = {
				status: 'Error',
				message: 'Wtf are you doing bro?'
			}
			return data;
		}

	}
}
