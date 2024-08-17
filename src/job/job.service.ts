import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from './shemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';


@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobsModel: mongoose.Model<Job>){}

    async findAll(): Promise<Job[]>{
        const jobs = await this.jobsModel.find();
        return jobs;
    }

    async findAllByQuery(query:Query): Promise<Job[]>{
        const keyword = query.keyword ? {
            postedby:{
                $regex:query.keyword,
                $options:'i',
            }
        }:{}
        const jobs = await this.jobsModel.find({...keyword});
        return jobs;
    }

    async create(job:Job):Promise<Job>{
        const res = await this.jobsModel.create(job);
        return res;
    }

    async findById(id:string): Promise<Job>{
        const job = await this.jobsModel.findById(id);

        if (!job){
            throw new NotFoundException('Job not found!');
         }
        return job;
    }

    async updateById(id:string, job:Job): Promise<Job>{
        return await this.jobsModel.findByIdAndUpdate(id,job,{
            new:true,
            runValidators:true
        });
    }
    async deleteById(id:string): Promise<Job>{
        return await this.jobsModel.findByIdAndDelete(id);
    }

    
}
