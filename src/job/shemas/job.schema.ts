import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Catagory{
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    REVIEW = 'Under Review'
}

@Schema({timestamps:true})
export class Job{

    @Prop()
    companyName:string
    
    @Prop()
    jobTitle:string

    @Prop()
    companyLogo:string

    @Prop()
    salaryType:string

    @Prop()
    jobLocation:string

    @Prop()
    postingDate:string

    @Prop()
    experienceLevel:string

    @Prop()
    employmentType:string

    @Prop()
    description:string

    @Prop()
    postedby:string

    @Prop()
    applicants?:[
        {
        username:string,
        email:string,
        cv:string,
        status:Catagory
        }
    ]

}

export const JobSchema = SchemaFactory.createForClass(Job)