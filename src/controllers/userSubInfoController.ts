import express, { Request, Response } from "express";
import { userSubInfoCreateDto } from "../interfaces/userSubInfo/userSubInfoCreateDto";
import { userSubInfoUpdateDto } from "../interfaces/userSubInfo/userSubInfoUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { userSubInfoService } from "../services";
import logger from "../log/logger";

const createUserSubInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userSubInfoCreateDto: userSubInfoCreateDto = req.body;

  try {
    const data = await userSubInfoService.createUserSubInfo(
      userSubInfoCreateDto
    );
    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.CREATED,
          message.CREATE_UNIT_TITLE_SUCCESS,
          data
        )
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
    logger.error("userSubInfoController > createUserSubInfo : error : ", error);
  }
};

const findAndUpdateUserSubInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userSubInfoUpdateDto: userSubInfoUpdateDto = req.body;

  try {
    const { userSubInfoId } = req.params;
    const data = await userSubInfoService.findUserSubInfoById(userSubInfoId);

    if (data) {
      if (data.likes) {
        if (req.body.like) {
          data.likes.push(req.body.id);
        } else {
          data.likes.splice(data.likes.indexOf(req.body.id), 1);
        }
      }
    }

    userSubInfoUpdateDto.likes = data?.likes;

    const updateData = await userSubInfoService.updateUserSubInfo(
      userSubInfoId,
      userSubInfoUpdateDto
    );

    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.OK, message.READ_UNIT_TITLE_SUCCESS, updateData)
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
    logger.error(
      "userSubInfoController > findAndUpdateUserSubInfo : error : ",
      error
    );
  }
};

const updateUserSubInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userSubInfoUpdateDto: userSubInfoUpdateDto = req.body;
  const { userSubInfoId } = req.params;

  try {
    const data = await userSubInfoService.updateUserSubInfo(
      userSubInfoId,
      userSubInfoUpdateDto
    );
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.OK, message.UPDATE_UNIT_TITLE_SUCCESS, data)
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
    logger.error("userSubInfoController > updateUserSubInfo : error : ", error);
  }
};

const findUserSubInfoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userSubInfoId } = req.params;
    const data = await userSubInfoService.findUserSubInfoById(userSubInfoId);

    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_UNIT_TITLE_SUCCESS, data));
  } catch (error) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
    logger.error(
      "userSubInfoController > findUserSubInfoById : error : ",
      error
    );
  }
};

const deleteUserSubInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userSubInfoId } = req.params;

  try {
    const data = await userSubInfoService.deleteUserSubInfo(userSubInfoId);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.OK, message.DELETE_UNIT_TITLE_SUCCESS, data)
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
    logger.error("userSubInfoController > deleteUserSubInfo : error : ", error);
  }
};

export default {
  createUserSubInfo,
  findAndUpdateUserSubInfo,
  updateUserSubInfo,
  findUserSubInfoById,
  deleteUserSubInfo,
};
