import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './shemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('job')
export class JobController {
    constructor(private jobService:JobService){}

    

    //fetching all jobs by query
    @Get('/query')
    async getAllJobsByQuery(@Query() query:ExpressQuery): Promise<Job[]>{
       return this.jobService.findAllByQuery(query)
    }
    
    //fetching all jobs
    @Get()
    async getAllJobs(): Promise<Job[]>{
        return this.jobService.findAll();
    }
    

    //creating a job 
    @Post('/create')
    async createJob(
        @Body() 
        job:CreateJobDto
    ): Promise<Job>{
        return this.jobService.create(job);
    }

    //fetching job by id
    @Get(':id')
    async getJob(@Param('id') id:string): Promise<Job>{
         const job = this.jobService.findById(id);
         return job;
    }

    //update a job 
    @Patch('/update/:id')
    async updateJob(
        @Param('id')
        id:string,
        @Body() 
        job:UpdateJobDto,
    ): Promise<Job>{
        return this.jobService.updateById(id,job);
    }

    //delete by id 
    @Delete('/delete/:id')
    async deleteJob(
        @Param('id')
        id:string,
    ): Promise<Job>{
        return this.jobService.deleteById(id);
    }

    

    // @Post('/uploadFile')
    // @UseInterceptors(FileInterceptor('image',{
    //     storage:diskStorage({
    //         destination:'./uploads',
    //         filename:(req,file,callBack)=>{
    //             const fileName = path.parse(file.originalname).name.replace(/\s/g,'')+Date.now();
    //             const extension = path.parse(file.originalname).ext;
    //             callBack(null,`${fileName}${extension}`);
    //         }
    //     })
    // }))
    // uploadFile(@Res() res,@UploadedFile() file){
    //     return res.status(HttpStatus.OK).json({
    //         success:true,
    //         data:file.path
    //     });
    // }

}
