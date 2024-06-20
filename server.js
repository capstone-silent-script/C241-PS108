require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loadModel = require('./helper/loadModel');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

// Load TensorFlow Model asynchronously
loadModel().then(model => {
    // Store the loaded model in app.locals
    app.locals.model = model;

    // Set up routes after the model is loaded
    app.use('/levels', require('./routes/levels'));
    app.use('/users', require('./routes/users'));
    app.use('/libraries', require('./routes/libraries'));

    // Default route
    app.use('/', (req, res) => {
        res.status(200);
        res.send("Selamat Datang di SilentScript");
    });

    // 404 route
    app.use("*", (req, res) => {
        res.status(404);
        res.send("404 Not Found");
    });
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch(err => {
    console.error('Failed to load model:', err);
});