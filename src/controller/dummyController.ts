import { dummytable1 } from './../../node_modules/.prisma/client/index.d';
"use strict";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

var dummy = async (req: any, res: any) => {
  await prisma.dummytable1.create({
    // select:null,
    // include: null,
    data: {
      title: "dummy title",
      content: "ye bhi dummy content",
      published: true
    }
    
  });

  return res.status(200).json({ message: "controller is working" });
};
exports.dummy = dummy;
