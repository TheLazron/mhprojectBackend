//imports
var express = require('express');
var bodyParser = require('body-parser')
const groupsRouter  = require('./routes/groupRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const jwt  = require('jsonwebtoken');
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

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

  }
  else{
    const newUser =await prisma.user.create({data:{
      name: name,
      email: email,
      profileUrl: profileUrl,
      bio: ""
    }})
    userID = newUser.userID;
  }

    const token = generateAccessToken(email);
    res.json({token: `Bearer ${token}`, userID: userID});


})


app.use('/', verifyToken);

app.use(groupsRouter);
app.use(userRouter);

app.listen(3005, () => {
  
  console.log("server listening on port 3005");

});
