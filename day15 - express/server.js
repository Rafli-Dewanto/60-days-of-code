const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logger')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// initialize middleware
// app.use(logger)

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server running on http://localhost:${PORT}`)
})