const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRouter = require('./routes/authRoutes');
const dbRouter = require('./routes/dbRoutes');

const app = express();
app.use(express.json());
app.use(cors());


app.listen(process.env.APP_PORT, () => {
    console.log('Server Up at port 8000!');
});

app.get('/', (req, res) => {
    res.send("covid backend");
})

app.use('/auth', authRouter);

app.use('/db', dbRouter);
