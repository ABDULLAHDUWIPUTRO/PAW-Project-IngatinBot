const express = require('express');
const path = require('path');
const config = require('./config/config');
const logger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);          // logger dipasang paling awal agar semua request tercatat
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
});

app.listen(config.port, () => {
  console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
});