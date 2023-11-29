import { Controller, Post, Body , Get , Param ,ParseIntPipe, Delete, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService) { }

    @Post()
    createUser(@Body() payload: CreateUserDto) {
       return this.userService.createUser(payload)
    }

    @Get(':id?')
    getUser(@Param('id') id :string){
        return this.userService.getAllUsers(parseInt(id))
    }

    @Patch(':id')
    updateUser(@Param('id',ParseIntPipe) id : number,@Body() payload :CreateUserDto){
        return this.userService.updateUser(id,payload);
    }

    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id : number){
        return this.userService.deleteUser(id);
    }

    @Post(':id/profile')
    createProfile(@Param('id',ParseIntPipe) id : number,@Body() payload : CreateProfileDto){
        return this.userService.createProfile(id,payload)
    }
}
