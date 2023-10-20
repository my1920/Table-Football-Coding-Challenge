const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const gamesRouter = require('./routes/games');

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello KissKiss');
});

app.use('/games', gamesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
