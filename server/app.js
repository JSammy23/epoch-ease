require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// MongoDB setup
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
};

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Render the error page
    res.status(err.status || 500);
    res.send('error');
});

const port = process.env.PORT || 3000;

// Start the sever
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
