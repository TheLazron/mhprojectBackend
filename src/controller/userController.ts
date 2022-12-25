import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const getUserDetails =async (req: any, res: any)=>{
    const userID = req.params.uid;
    const userEmail = res.email;

    const user = await prisma.user.findUnique({where: {userID:userID}})

    res.status(200).json({userID: userID, userEmail: userEmail, user: user});


}


exports.getUserDetails = getUserDetails;