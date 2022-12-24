import { User} from '.prisma/client';
"use strict";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const getAllGroups = async (req: any, res: any) => {
  const groupData = await prisma.group.findMany();

  return res.json({groups: groupData})
  // await prisma.user.create({
  //   data: {
  //     name: "Pandat",
  //     email: "pandat@gmail.com",
  //     bio: "Pandat hu",
  //     profileUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
  //   }
  // })
};

const getSingleGroup = async (req: any, res: any)=>{
        console.log("group ID", req.params.groupId);
  const groupData= await prisma.group.findUnique({where: {groupID: req.params.groupId}})
  if(groupData){
    return res.status(200).json({groupData: groupData})
  }else{
  return  res.status(404).json({message: "Couldn't get details for the current group"})
  }
}


exports.getAllGroups = getAllGroups;
exports.getSingleGroup = getSingleGroup;