const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const gamesRouter = require('./routes/games');
const playersRouter = require('./routes/players');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Table Football API',
            version: '1.0.0',
            description: 'A simple API for managing babyfoot scores'
        },
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello KissKiss');
});

app.use('/games', gamesRouter);
app.use('/players', playersRouter);

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;