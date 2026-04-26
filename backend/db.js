import mongoose from 'mongoose';

const connectionParams = {
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
};

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB, connectionParams);
		console.log('Connected to database successfully');
		
		mongoose.connection.on('error', (err) => {
			console.error('MongoDB connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('MongoDB disconnected');
		});

		process.on('SIGINT', async () => {
			await mongoose.connection.close();
			console.log('MongoDB connection closed through app termination');
			process.exit(0);
		});

	} catch (error) {
		console.error('Database connection error:', error);
		process.exit(1);
	}
};

export default connectDB;