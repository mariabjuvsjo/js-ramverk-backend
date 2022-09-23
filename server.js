const app = require('./app.js');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;

db.getDb();


app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});
