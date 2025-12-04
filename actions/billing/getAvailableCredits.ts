// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GetAvailableCredits(){
//     const {userId}=auth();
//     if(!userId){
//         throw new Error("unauthenticated");
//     }
//     const balance=await prisma.userBalance.findUnique({
//         where:{userId},
//     });
//     if(!balance) return -1;
//     return balance.credits
    
// }



"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetAvailableCredits() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  let balance = await prisma.userBalance.findUnique({
    where: { userId },
  });

  // ⭐ If balance doesn't exist, create with 10000 credits
  if (!balance) {
    balance = await prisma.userBalance.create({
      data: {
        userId,
        credits: 10000,
      },
    });
  }

  return balance.credits;
}


