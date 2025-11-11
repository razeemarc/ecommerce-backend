import { prisma } from "../../config/database";
import { User } from "@prisma/client";




export class UserRepository {
async getAllUsers(){
    return await prisma.user.findMany()
}
async updateUser(User:User){
    return await prisma.user.update({
        where:{
            id:User.id
        },
        data:User
    })
}
}