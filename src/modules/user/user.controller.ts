import { Request, Response } from 'express';
import { UserService } from './user.services';

export class UserController {

private userService:UserService;

constructor(){

this.userService=new UserService();

}

getAllusers=async(req:Request,res:Response):Promise<void>=>{

try{

const result=await this.userService.getAllUsers();

res.status(200).json({

success:true,

message:"users fetched successfully",

data:result,    
})
}
catch(error){

    res.status(500).json({
    
    success:false,
    
    message:"something went wrong",
    
    error:error,
    })
       
    
    }
}
}