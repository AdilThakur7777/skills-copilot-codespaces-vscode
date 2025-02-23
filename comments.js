// Create web server
// 1. Import express
const express = require('express');
// 2. Create express server
const app = express();
// 3. Create a port
const PORT = 3000;
// 4. Listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// 5. Create a route
app.get('/', (req, res) => {
    res.send('Hello world');
});
// 6. Create another route
app.get('/comments', (req, res) => {
    res.send('This is the comments page');
});