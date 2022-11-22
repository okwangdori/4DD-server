import express, { Request, Response } from "express";
import { postCreateDto } from "../interfaces/post/postCreateDto";
import { postUpdateDto } from "../interfaces/post/postUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { postService } from "../services";


const createPost = async (req: Request, res: Response): Promise<void> => {
    const postCreateDto: postCreateDto = req.body;
    
    try {
        const data = await postService.createPost(postCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const updatePost = async (req: Request, res: Response): Promise<void> => {
    const postUpdateDto: postUpdateDto = req.body;
    const { postId } = req.params;

    try {
        const data = await postService.updatePost(postId, postUpdateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.UPDATE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const findPostById = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    try {
        const data = await postService.findPostById(postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const getPosts = async (req: Request, res: Response): Promise<void> => {

    try {
        const data = await postService.getPosts();
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    try {
        const data = await postService.deletePost(postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.DELETE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createPost,
    updatePost,
    findPostById,
    getPosts,
    deletePost,
}