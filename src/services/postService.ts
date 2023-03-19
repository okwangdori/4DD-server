import { postBaseResponseDto } from "../interfaces/common/postBaseResponseDto";
import { postCreateDto } from "../interfaces/post/postCreateDto";
import { postResponseDto } from "../interfaces/post/postResponseDto";
import { postUpdateDto } from "../interfaces/post/postUpdateDto";
import Post from "../models/Post";
import moment from "moment";



const createPost = async (postCreateDto: postCreateDto): Promise<postBaseResponseDto> => {
    try {
    	// create를 위해 각 filed명에 값들을 할당시켜준다.
        const post = new Post({
            userName: postCreateDto.userName,
            title: postCreateDto.title,
            content: postCreateDto.content,
            dateTimeOfPosting: moment().format("YYYY-MM-DD hh:mm:ss"),
            additional: {
                category: postCreateDto.additional?.category,
                season: postCreateDto.additional?.season,
            }
        });
        await post.save();

        const data = {
            _id: post.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updatePost = async (postId: string, postUpdateDto: postUpdateDto): Promise<postUpdateDto | null> => {
    try {
        await Post.findByIdAndUpdate(postId, postUpdateDto); // update 로직
        const post = await findPostById(postId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
		if (!post) {
            return null;
        }
        return post;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (postId: string): Promise<postResponseDto | null> => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return null;
        }
        return post;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPosts = async (): Promise<any> => {
    try {
        const posts = await Post.find()
        .sort({ dateTimeOfPosting: -1 })
        .exec();
        if (!posts) {
            return null;
        }
        return posts;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deletePost = async (postId: string): Promise<postResponseDto | null> => {
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return null;
        }
        return post;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default {
    createPost,    
    updatePost,
    findPostById,
    getPosts,
    deletePost
}