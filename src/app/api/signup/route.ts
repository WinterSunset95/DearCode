import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
	// Check if the table 'users' exist
	// If not, create it
	const { rows: table } = await sql`SELECT * FROM information_schema.tables WHERE table_name = 'users'`;
	if (!table.length) {
		const { rows: newTable } = await sql`CREATE TABLE users (id SERIAL PRIMARY KEY, uname TEXT, pass TEXT)`;
		if (!newTable.length) {
			const response = {
				status: 'error',
				message: 'Could not create table'
			}
			return NextResponse.json(response);
		}
	}

	// Get the uname and pass
	// Confirm that they are not empty
	const { uname, pass } = await req.json();
	if (!uname || !pass) {
		const response = {
			status: 'error',
			message: 'Username or password cannot be empty'
		}
		return NextResponse.json(response);
	}

	// Check if user already exists
	const { rows } = await sql`SELECT * FROM users WHERE uname = ${uname} AND pass = ${pass}`;
	if (rows.length) {
		const response = {
			status: 'error',
			message: 'User already exists'
		}
		return NextResponse.json(response);
	}

	// If the code reaches upto here, it means the database is up, and the user is not yet on the database
	// We signup the new user and return a 'success' response
	const { rows: newUser } = await sql`INSERT INTO users (uname, pass) VALUES (${uname}, ${pass}) RETURNING *`;
	if (newUser.length) {
		const response = {
			status: 'success',
			message: 'User created successfully'
		}
		return NextResponse.json(response);
	}

	// And finally if the code reaches here... you royally fucked something up
	// However, we'll handle the error with a not-so-helpful error message
	const response = {
		status: 'error',
		message: 'Bro wtf did you even do?'
	}

	return NextResponse.json(response)
}
