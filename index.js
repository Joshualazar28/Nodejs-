/**
 * Node-JS Boilerplate
 * @author Joshua Lazar
 */
require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 5000;
require('./database');

// Middleware
require('./middleware/common')(app);

// API Routes
app.use('/api', require('./routes'));

app.get('/prod', function (req, res) {
  res.send('Hello World QA');
});
// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});
