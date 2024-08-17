import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"
import { Catagory } from "../shemas/job.schema"


export class CreateJobDto{
    @IsNotEmpty()
    readonly companyName:string

    @IsNotEmpty()
    @IsString()
    readonly jobTitle:string

    @IsOptional()
    @IsUrl()
    readonly companyLogo:string

    @IsNotEmpty()
    @IsString()
    readonly salaryType:string

    @IsNotEmpty()
    @IsString()
    readonly jobLocation:string
    readonly postingDate:string

    @IsNotEmpty()
    @IsString()
    readonly experienceLevel:string

    @IsNotEmpty()
    @IsString()
    readonly employmentType:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    @IsEmail()
    readonly postedby:string
    readonly applicants:[{
        username:string,
        email:string,
        cv:string,
        status:Catagory
        }]
}