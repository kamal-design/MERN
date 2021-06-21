// importing
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

//PUSHER
const pusher = new Pusher({
  appId: "1204365",
  key: "5b3683d586edb01a0501",
  secret: "4a9f5df8b44bddf8c7e6",
  cluster: "ap2",
  useTLS: true
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

//middleware
app.use(express.json());
app.use(cors());
///Cors used below header
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Orgin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}); */

// database config
const connection_URI = "mongodb+srv://admin:FCWTSzL8RWRdCMZr@cluster0.yj2as.mongodb.net/whatsapp?retryWrites=true&w=majority";
mongoose.connect(connection_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}, err => {
  if(err) throw err;
  //console.log('Connected to MongoDB');
});

const db = mongoose.connection;
db.once("open", () => {
  console.log('DB Connected');
  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log('A changes occured', change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });      
    } else {
      console.log('Error triggering Pusher');
    }
  });

});

// api routes
app.get('/', (req, res) => res.status(200).send('Hi Kamal whatsapp Clone'));

//message receive
app.get('/messages/sync', (req, res) => {
  Messages.find( (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  });
});

//message post
app.post('/messages/new', (req, res) => {
  const dbMessage = req.body
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  });
});





//listen
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
