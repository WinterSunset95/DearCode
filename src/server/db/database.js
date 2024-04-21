import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL
})

const initialiseDatabase = async () => {
	try {
		const response = await pool.query('select * from users')
		console.log(response)
	} catch {
		console.log("Table users not found")
	}
}

initialiseDatabase();

export const query = async (text, params) => {
	const start = Date.now()
	const res = await pool.query(text, params)
	const duration = Date.now() - start
	console.log('executed query', { text, duration, rows: res.rowCount })
	return res
}
