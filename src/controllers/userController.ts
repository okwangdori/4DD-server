import express, { Request, Response } from "express";
import { userCreateDto } from "../interfaces/user/userCreateDto";
import { userUpdateDto } from "../interfaces/user/userUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { userService } from "../services";
import { refreshTokenCookieOptions } from '../constants';
import logger from "../log/logger";

const REFRESHTOKEN = 'refreshtoken';

const signup = async (req: Request, res: Response): Promise<void> => {
    const userCreateDto: userCreateDto = req.body;    
    try {
        const data = await userService.signup(userCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userUpdateDto: userUpdateDto = req.body;
    const { userId } = req.params;

    try {
        const data = await userService.updateUser(userId, userUpdateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.UPDATE_USER_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const findUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const data = await userService.findUserById(userId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const getUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const data = await userService.getUsers();
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


const login = async (req: Request, res: Response): Promise<void> => {    
    const userCreateDto: userCreateDto = req.body;
    try {
        const data = await userService.login(userCreateDto);
        res.cookie(REFRESHTOKEN, data?.refreshToken, refreshTokenCookieOptions);
        if(data) {
            res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
        }else{
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.INVALID_EMAIL_OR_PASSWORD));    
        }
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const data = await userService.deleteUser(userId);
        res.status(statusCode.CREATED).send(util.success(statusCode.OK, message.DELETE_POST_SUCCESS, data));
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    signup,
    updateUser,
    findUserById,
    getUsers,
    login,
    deleteUser,
}