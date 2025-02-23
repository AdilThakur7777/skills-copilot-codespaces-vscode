//create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

//get data
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

//post data
app.post('/comments', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }).on('end', () => {
        fs.readFile('comments.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            let comments = JSON.parse(data);
            let newComment = JSON.parse(body);
            comments.push(newComment);
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.send('Comment added');
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});