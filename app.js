const express = require('express');
const appointmentsRouter = require('./routes/appointments');
const usersRouter = require('./routes/users');
const app = express();
const PORT = 3000;

app.use(express.json())

app.use('/appointments', appointmentsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('server running on ' + PORT));