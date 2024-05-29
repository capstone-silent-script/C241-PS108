require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/libraries', require('./routes/libraries'))

app.use('/', (req, res) => {
    res.status(200);
    res.send("Selamat Datang di SilentScript");
});

app.use("*", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});