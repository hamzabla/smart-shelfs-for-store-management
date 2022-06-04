const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM4');
// const express = require('express');
// const router = express.Router();
// const Shelf = require("./models/shelfModel");
const fetch = require("node-fetch");
const parser = new Readline();
port.pipe(parser);
parser.on('data', function (data) {
    fetch('localhost:5000/api/v1/shelves/62976c365db6615c8a6e81fb', {
        method: 'PUT',
        body: JSON.stringify({
            shelfCapacity: 20,
            state: "empty",
            product: "6296ce84d69a2b241f96f6a7",
            inShelfNumber: 10
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => console.log(json));
//     router.put('localhost:5000/api/v1/shelves/62976c365db6615c8a6e81fb',  async (req, res, next) => {
//         const {id}= "62976c365db6615c8a6e81fb";
//         const {
//             shelfCapacity,
//             state,
//             product,
//             inShelfNumber
//         } = {
//             shelfCapacity: 20,
//             state: "empty",
//             product: "6296ce84d69a2b241f96f6a7",
//             inShelfNumber: 10
//         };

//         try{
//             let shelf = await Shelf.findOneAndUpdate({ _id: id }, {
//                 shelfCapacity,
//                 state,
//                 product,
//                 inShelfNumber
//             },{ returnOriginal: false },);
        
//         }catch(err) {
//             req.smartShelf = { errorCode: err.code }
//             next();
//             return;
    
//         }
//     }
//     );
console.log(data);
});
port.write('ROBOT PLEASE RESPOND\n');