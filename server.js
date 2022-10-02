const app = require('./app.js');
const db = require('./db/database');
const http = require("http");
const cors = require('cors');
const { Server } = require('socket.io')
const Doc = require('./models/texts');

const PORT = process.env.PORT || 3001;

app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH"],
    }
})


io.on("connection", (socket) => {
    socket.on('get-document', async docId => {
        const document = await findDoc(docId)

        console.log(document.text)
        socket.join(docId)

        //console.log("hello" + text)
        socket.emit('load-document', document.text)



        socket.on('send-changes', delta => {
            socket.broadcast.to(docId).emit("receive-changes", delta)
        })

        socket.on("save-document", async text => {
            await Doc.findByIdAndUpdate(docId, { text })
        })
    })
})



async function starter() {
    await db.getDb();
    server.listen(PORT, () => {
        console.log('Listening on port: ' + PORT);
    });


}

starter()


async function findDoc(id) {
    if (id == null) return

    const document = await Doc.findById(id)
    if (document) return document
}


