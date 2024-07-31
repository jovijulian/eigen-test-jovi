const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/route");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
});

// Mount your routes
app.use(route);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send({ message: req.originalUrl + " not found" });
});

app.listen(port, () => {
    console.log(`Eigen test Library App listening at http://localhost:${port}`);
});
