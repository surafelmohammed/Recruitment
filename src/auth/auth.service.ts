import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModule:Model<User>,
        private jwtService:JwtService
    ){}

    async signUp(signUpDto:SignUpDto):Promise<{token:string}>{

        const {accountType,username,email,password} = signUpDto

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await this.userModule.create({
            accountType,
            username,
            email,
            password:hashedPassword
        })
        const token = this.jwtService.sign({id:user._id})
        return {token}
    }

    async login(loginDto:LoginDto){
        const  {email,password} = loginDto

        const user = await this.userModule.findOne({email})

        if(!user){
            throw new BadRequestException('Invalid email or password')
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({id:user._id})

        return token
    }
        async findById(id:string): Promise<User>{
            const user = await this.userModule.findById(id);

            if (!user){
                throw new NotFoundException('Job not found!');
            }
        return user;
    }

}
