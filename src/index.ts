//imports
var express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const groupsRouter  = require('./routes/groupRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const http = require('http');
const jwt  = require('jsonwebtoken');
import { PrismaClient } from "@prisma/client";
import { disconnect } from "process";
import { Server } from "socket.io";
import { createClient } from "@supabase/supabase-js";


const prisma = new PrismaClient();
const supabase = createClient(
  "https://bqzmnjuzohnbbepdwfcd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxem1uanV6b2huYmJlcGR3ZmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyODYxMDcsImV4cCI6MTk4ODg2MjEwN30.HgiBkz4mhWtKP7H-cNdIycCgUOmHikvZRIR30svZBUY"
);
//Functions
//jwt Functions
const generateAccessToken=(email: String)=>{
  return jwt.sign({ email }, "secret", { expiresIn: "1800s", });
}

const parseJwt=(token:any)=>{
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const verifyToken=(req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null){
    console.log("provide token");
    res.status(401).json({message: "Provide with a valid authentication token"})
  } 

  jwt.verify(token, "secret", (err: any, decoded:any) => {
    if (err){
     res.status(401).json({message: "token not verified"})
    } 
    else{
      // res.status(200).json({message: "Token verified"});
      const parsedToken=parseJwt(token);
      const email = parsedToken.email;
      res.email  = email
      next();
    }
    
 
  });

}

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }))

//routes

//login route
app.post('/login',async (req: any, res: any) => {
  const {email, name, profileUrl}  = req.body;
 var userID;
console.log(email, name, profileUrl);
  const user = await prisma.user.findUnique({where: {email: email}});
  if(user){
    userID = user.userID;
    console.log("user exists")
  }else if(!user){
   try{
    const newUser =await prisma.user.create({data:{
      name: name,
      email: email,
      profileUrl: profileUrl,
      bio: ""
    }})
    userID = newUser.userID;
  }catch(err){
    console.log("err",err);
  }
  }

    const token = generateAccessToken(email);
    res.json({token: `Bearer ${token}`, userID: userID});


})


app.use('/', verifyToken);

app.use(groupsRouter);
app.use(userRouter);


const server = http.createServer(app);

// Cors Websocket Server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
})

server.listen(3333, ()=>{
  console.log('server listening on port 3333');
})


io.on('connection',(socket:any)=>{
  console.log(`user Connected ${socket.id}`)

  socket.emit('message', "Hey welcome to the chat");
  socket.broadcast.emit('message', "A new user has joined the chat");
  

  socket.on('disconnect', (data:any)=>{
    io.emit("message", `${data} disconnected`);
    console.log("A user has disc")
  })

  socket.on('join_room', (data:any)=>{
    const {username, room} =data;
    console.log(`${username} joined ${room}`);
    socket.join(room);
     let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.broadcast.emit('message', {
      message: `${username} has joined the chat room`,
      username: "RandBot",
      __createdtime__,
    });
  })

  socket.on('chatMessage', async (data:any)=>{
    io.emit('chatMessage', data);
    const { error } = await supabase
  .from('cancerSupportGroup')
  .insert({  message: data, sender: "Jack"})
  console.log("err", error);
      console.log(data);
    
  })


})

  


app.listen(3005, ()=>console.log("server listening on port 3005"));