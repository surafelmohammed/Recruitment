import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator"
import { Catagory } from "../shemas/job.schema"


export class UpdateJobDto{
    @IsOptional()
    @IsString()
    readonly companyName:string

    @IsOptional()
    @IsString()
    readonly jobTitle:string

    @IsOptional()
    @IsUrl()
    readonly companyLogo:string

    @IsOptional()
    @IsString()
    readonly salaryType:string

    @IsOptional()
    @IsString()
    readonly jobLocation:string
    readonly postingDate:string

    @IsOptional()
    @IsString()
    readonly experienceLevel:string

    @IsOptional()
    @IsString()
    readonly employmentType:string

    @IsOptional()
    @IsString()
    readonly description:string

    @IsOptional()
    @IsEmail()
    readonly postedby:string
    readonly applicants:[{
        username:string,
        email:string,
        cv:string,
        status:Catagory
        }]
}