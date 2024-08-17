import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,private jwtService:JwtService){}

    @Post('/signup')
    async signup(@Body() signUpDto:SignUpDto):Promise<{token:string}>{
        return this.authService.signUp(signUpDto)
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto, @Res({passthrough:true}) response:Response ){
        const jwt = await this.authService.login(loginDto)
        response.cookie('jwt',jwt,{httpOnly:true});
        return {
            message:'success'
        }
    }

    @Get('user')
    async user(@Req() request:Request){

        try{
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie)

            if(!data){
                throw new UnauthorizedException();
            }

            const user = await this.authService.findById(data.id)

            return user;
        }catch(e){
                throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({passthrough:true}) response:Response){
            response.clearCookie('jwt')
            return {
                message:'successfuly loged out'
            }
    }

}
