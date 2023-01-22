import express, { Request, Response } from "express";
import { userInfoDto } from "../interfaces/user/userInfoDto";
import { userCreateDto } from "../interfaces/user/userCreateDto";
import { userUpdateDto } from "../interfaces/user/userUpdateDto";
import { userSubInfoCreateDto } from "../interfaces/userSubInfo/userSubInfoCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { unitTitleService, userService, userSubInfoService } from "../services";
import {
  ACCESSTOKEN,
  REFRESHTOKEN,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../constants";

const register = async (req: Request, res: Response): Promise<void> => {
  const userInfoDto: userInfoDto = req.body;
  const userCreateDto: userCreateDto = req.body;
  try {
    const checkName = await userService.checkName(userInfoDto);
    const checkEmail = await userService.checkEmail(userInfoDto);
    if (checkName) {
      res
        .status(statusCode.FORBIDDEN)
        .send(util.fail(statusCode.FORBIDDEN, message.ALREADY_EXIST_NAME));
      return;
    }
    if (checkEmail) {
      res
        .status(statusCode.FORBIDDEN)
        .send(util.fail(statusCode.FORBIDDEN, message.ALREADY_EXIST_EMAIL));
      return;
    }

    //23.01.21 HWI 회원가입 전 userSubInfo 생성
    const unit = await unitTitleService.findUnitTitleIdList();

    let userSubInfoCreateDto: userSubInfoCreateDto = unit;

    const subInfoId = await userSubInfoService.createUserSubInfo(
      userSubInfoCreateDto
    );

    userCreateDto.user_sub_info = subInfoId._id;

    const data = await userService.register(userCreateDto);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)
      );
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userUpdateDto: userUpdateDto = req.body;
  const { userId } = req.params;

  try {
    const data = await userService.updateUser(userId, userUpdateDto);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.UPDATE_USER_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const findUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const data = await userService.findUserById(userId);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await userService.getUsers();
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const userCreateDto: userCreateDto = req.body;
  try {
    const data = await userService.login(userCreateDto);
    res.cookie(REFRESHTOKEN, data?.refreshToken, refreshTokenCookieOptions);
    res.cookie(ACCESSTOKEN, data?.accessToken, accessTokenCookieOptions);
    if (data) {
      res
        .status(statusCode.CREATED)
        .send(util.success(statusCode.OK, message.LOGIN_SUCCESS, data));
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .send(
          util.fail(statusCode.NOT_FOUND, message.INVALID_EMAIL_OR_PASSWORD)
        );
    }
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie(REFRESHTOKEN, "");
    res.cookie(ACCESSTOKEN, "");
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.LOGOUT_SUCCESS));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  const userUpdateDto: userUpdateDto = req.body;
  try {
    const data = await userService.changePassword(userUpdateDto);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.CHANGE_PASSWORD_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const data = await userService.deleteUser(userId);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.DELETE_POST_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};

export default {
  register,
  updateUser,
  findUserById,
  getUsers,
  login,
  logout,
  changePassword,
  deleteUser,
};
