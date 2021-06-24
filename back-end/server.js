import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(helmet());
app.use(compression());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/front-end/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html')));
} else {
	app.get('/', (req, res) => {
		res.send('API is running....');
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
	console.log('connection', socket.id);
	socket.on('disconnect', () => {
		const user = users.find((x) => x.socketId === socket.id);
		if (user) {
			user.online = false;
			console.log('Offline', user.name);
			const admin = users.find((x) => x.isAdmin && x.online);
			if (admin) {
				io.to(admin.socketId).emit('updateUser', user);
			}
		}
	});
	socket.on('onLogin', (user) => {
		const updatedUser = {
			...user,
			online: true,
			socketId: socket.id,
			messages: []
		};
		const existUser = users.find((x) => x._id === updatedUser._id);
		if (existUser) {
			existUser.socketId = socket.id;
			existUser.online = true;
		} else {
			users.push(updatedUser);
		}
		console.log('Online', user.name);
		const admin = users.find((x) => x.isAdmin && x.online);
		if (admin) {
			io.to(admin.socketId).emit('updateUser', updatedUser);
		}
		if (updatedUser.isAdmin) {
			io.to(updatedUser.socketId).emit('listUsers', users);
		}
	});

	socket.on('onUserSelected', (user) => {
		const admin = users.find((x) => x.isAdmin && x.online);
		if (admin) {
			const existUser = users.find((x) => x._id === user._id);
			io.to(admin.socketId).emit('selectUser', existUser);
		}
	});

	socket.on('onMessage', (message) => {
		if (message.isAdmin) {
			const user = users.find((x) => x._id === message._id && x.online);
			if (user) {
				io.to(user.socketId).emit('message', message);
				user.messages.push(message);
			}
		} else {
			const admin = users.find((x) => x.isAdmin && x.online);
			if (admin) {
				io.to(admin.socketId).emit('message', message);
				const user = users.find((x) => x._id === message._id && x.online);
				user.messages.push(message);
			} else {
				io.to(socket.id).emit('message', {
					name: 'Admin',
					body: "admin n'est pas en ligne"
				});
			}
		}
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
