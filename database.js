const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const username = 'user';
const password = 'password';
const dbHost = 'localhost';
const dbPort = 27018;
const dbName = 'campusmap';
//const dbURL = `mongodb://${username}:${password}@${dbHost}:${dbPort}?authSource=${dbName}`;
//const dbURL = 'mongodb://user:password@localhost:27017/?authSource=wsp';
const dbURL = `mongodb://@${dbHost}:${dbPort}?authSource=${dbName}`;
let buildingCollection;

let dbclient;

function startDBandApp(app, PORT){
    MongoClient.connect(dbURL, {poolSize: 20, useNewUrlParser: true})
    .then(client => {
        dbclient = client;
        buildingCollection = app.locals.buildingCollection = client.db(dbName).collection('buildings')
        app.locals.client = client;
        app.locals.wspDB = client.db(dbName);
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        })
        
    })
   .catch(err => {
       console.log('DB connecton error: ', err)
   });
}

process.on('SIGINT', () => {
    dbclient.close();
    console.log('db connection closed by SIGINT')
    process.exit();
})

module.exports = {startDBandApp, ObjectID, buildingCollection };