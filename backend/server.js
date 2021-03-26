// Setting up config file
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' })

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught exception`);
    process.exit(1);
})

// Connecting to DB
const connectDatabase = require('./config/database');
connectDatabase();

// Start the server
const app = require('./app');
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// Handle Uhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})