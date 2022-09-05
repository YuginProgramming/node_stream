const express = require('express');
const multer = require('multer');
const server = express();

const crypto = require('crypto');
const fs = require('fs');
const Stream = require('stream');

server.use(express.static(__dirname));
server.set('view engine', 'ejs');
server.set('views', './views');

const localMulter = multer({dest:'uploads'}).single('filedata');

server.get('/', (req, res) => {
    res.render('main');
})

server.post('/uploads', function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);    
});

server.post('/upload1', localMulter, function (req, res, next) {

        // зчитуємо файл стрімом
    const getFile = async (req, res, next) => {
    const readStream = await (fs.createReadStream(req.file.path));
    };  // const fileBuffer = fs.readFile(req.file.path);
    
    const hashSum = crypto.createHash('sha256');
    hashSum.update(getFile);
    const hex = hashSum.digest('hex');
    
    stream.pipe(readStream);
    stream.pipe(hex);

    console.log('Nazva', hex);
    
    fs.rename(req.file.path, `./uploads/${hex}`, (err) => {
        if (err) throw err;
        console.log('renamed complete');
      });    
    });

    server.get('/uploads/:name', (req, res) => {
        res.send(req.file);
    }); 

server.listen(3000);