import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository : Repository<Profile>
    ) { }

    async createUser(payload: CreateUserDto) {
        const userFound = await this.userRepository.findOne({ where: { username: payload.username } })
        if (userFound) {
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(payload)
        return this.userRepository.save(newUser)
    }

    async getAllUsers(id?: number) {
        if (id && id > 0) {
            const userFound = await this.userRepository.findOne({ where: { id: id } , relations:['publicaciones'] });
            if (userFound) {
                return userFound
            }
            return new HttpException('El usuario no se encontro', HttpStatus.NOT_FOUND);
        }
        return this.userRepository.find()
    }

    async deleteUser(id: number) {
        const userFound = await this.userRepository.delete({ id });
        if (userFound.affected === 0) {
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
        }
        return;
    }

    async updateUser(id: number, payload: CreateUserDto) {
        const db = await this.userRepository.findOne({ where: { id } });
        if (payload.username && db.username !== payload.username) {
            db.username = payload.username;
        }
        if (payload.password && db.password !== payload.password) {
            db.password = payload.password;
        }
        return await this.userRepository.save(db);
    }

    async createProfile(id:number,profile :CreateProfileDto ){
        const dbuser = await this.userRepository.findOne({where:{id}})
        if (!dbuser) {
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND)
        }
        const newProfile =  this.profileRepository.create(profile)
        const saveProfile =  await this.profileRepository.save(newProfile);
        dbuser.profile = saveProfile
        return this.userRepository.save(dbuser)
    }
}
