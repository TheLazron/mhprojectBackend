import { User} from '.prisma/client';
"use strict";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const getAllGroups = async (req: any, res: any) => {
  console.log("parsed email", res.email);
  const groupData = await prisma.group.findMany();

  return res.json({groups: groupData})
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

const joinGroup = async (req: any, res: any)=>{


  // const members = await prisma.group.findUnique({
  //   where: {groupID: req.params.groupId}
  // })  
  await prisma.group.update({
    where:{
      groupID: req.params.groupId
    },
    data:{
      members: {
        set: {email: res.email}
      }
      // name: "ho gya update"
    }
})

res.json({message:"Group was joined successfully"});

}


exports.getAllGroups = getAllGroups;
exports.getSingleGroup = getSingleGroup;
exports.joinGroup = joinGroup;