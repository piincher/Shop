import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Piincher',
		email: 'Piincher@example.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Deno',
		email: 'Deno@example.com',
		password: bcrypt.hashSync('123456', 10)
	}
];

export default users;
