"use server"

import prisma from "@/lib/prisma"

export async function getUserAddress(userId: string) {
  try{
    const address = await prisma.userAddress.findUnique({
      where:{
        userId
      }
    })
    if(!address) return null
    const { address2,countryId, ...rest } = address
    return {
      ...rest,
      address2: address2 || '',
      country: countryId
    }
  }catch(e){
    console.log(e)
    return null
  }
}