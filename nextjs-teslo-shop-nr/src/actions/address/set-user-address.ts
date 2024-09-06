"use server"

import {Address} from '@/interfaces/address.interface'
import prisma from '@/lib/prisma'

export async function setUserAddress (address: Address, userId: string) {
  try{

    const newAddress = await createOrReplaceAddress(address, userId)

    return{
      ok:true,
      address:newAddress
    }

  }catch(error){
    console.log(error)
    return {
      ok:false,
      message: 'Nose pudo grabar la direccion'
    }
  }
}

async function createOrReplaceAddress(address: Address, userId: string){
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where:{
        userId
      }
    })

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,      
      countryId: address.country,
      phone: address.phone,
      city: address.city
    }

    if(!storedAddress){
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })
      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      where:{
        userId
      },
      data: addressToSave
    })

    return updatedAddress

  } catch (error) {
    console.log(error)
    throw new Error('Nose pudo grabar la direccion')
  }
}