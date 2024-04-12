import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
	// Get the uname and pass, make sure they're not empty
	const { uname, pass } = await req.json()

	// Check if the table 'users' exist
	// If not, return a connection error
	const { rows: usersTable} = await sql`select * from information_schema.tables where table_name = 'users'`;
	if (!usersTable.length) {
		const res = {
			status: 'error',
			message: 'Users table not found'
		}

		return NextResponse.json(res)
	}

	// Check if the user exists in the table
	const { rows: user } = await sql`select * from users where uname = ${uname}`;
	if (!user.length) {
		const res = {
			status: 'error',
			message: `User ${uname} not found`
		}

		return NextResponse.json(res)
	}

	// Check if the password matches
	if (user[0].pass !== pass) {
		const res = {
			status: 'error',
			message: 'Incorrect password'
		}

		return NextResponse.json(res)
	}

	// If it reaches here, then the user is authenticated
	if (user[0].pass === pass) {
		const res = {
			status: 'success',
			message: `Welcome ${uname}`
		}

		return NextResponse.json(res)
	}

	// If it reaches here, bro you fucked up
	const res = {
		status: 'error',
		message: 'Wtf you doing'
	}

	return NextResponse.json(res)
}
