import * as db from '../db/database.js'

export const getUsers = async () => {
	try {
		const result = await db.query('select * from users')
		return result.rows
	} catch (err) {
		return {
			error: err
		}
	}
}
