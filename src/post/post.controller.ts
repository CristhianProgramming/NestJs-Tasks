import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post()
    createPost(@Body() payload: CreatePostDto) {
        return this.postService.createPost(payload)
    }

    @Get()
    getPosts() {
        return this.postService.getPost()
    }

}
