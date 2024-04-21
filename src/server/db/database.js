import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL
})

export const initialiseDatabase = async () => {
	try {
		const response = await pool.query('select * from users')
		console.log("Database is up")
	} catch {
		// So we don't have a 'users' table...
		// Let's create one
		try {
			console.log("Users table not found, creating.....")
			const response = await pool.query('create table if not exists users (id serial primary key, username varchar(255), password varchar(255), created_at timestamp)')
			console.log(response)
		} catch {
			console.log("Error creating users table")
		}
	}
}

export const query = async (text, params) => {
	const start = Date.now()
	const res = await pool.query(text, params)
	const duration = Date.now() - start
	console.log('executed query', { text, duration, rows: res.rowCount })
	return res
}
