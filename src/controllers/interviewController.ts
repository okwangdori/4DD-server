import express, { Request, Response } from "express";
import { interviewCreateDto } from "../interfaces/interview/interviewCreateDto";
import { interviewUpdateDto } from "../interfaces/interview/interviewUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { interviewService } from "../services";
import logger from "../log/logger";

const createInterview = async (req: Request, res: Response): Promise<void> => {
  const interviewCreateDto: interviewCreateDto = req.body;

  try {
    const data = await interviewService.createInterview(interviewCreateDto);
    let resultData = null;

    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.CREATED,
          message.CREATE_INTERVIEW_SUCCESS,
          resultData
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
  }
};

const updateInterview = async (req: Request, res: Response): Promise<void> => {
  const interviewUpdateDto: interviewUpdateDto = req.body;
  const { interviewId } = req.params;
  let titleData = null;
  let resultArr = [];

  try {
    const data = await interviewService.updateInterview(
      interviewId,
      interviewUpdateDto
    );

    resultArr.push(titleData);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.OK, message.UPDATE_INTERVIEW_SUCCESS, data)
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

const findInterviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { interviewId } = req.params;

  try {
    const data = await interviewService.findInterviewById(interviewId);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_INTERVIEW_SUCCESS, data));
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

const findAllInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await interviewService.findAllInterview();
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_INTERVIEW_SUCCESS, data));
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

const findInterviewMainCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await interviewService.findInterviewMainCategory();
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.READ_INTERVIEW_SUCCESS, data));
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

const deleteInterview = async (req: Request, res: Response): Promise<void> => {
  const { interviewId } = req.params;

  try {
    const data = await interviewService.deleteInterview(interviewId);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.OK, message.DELETE_INTERVIEW_SUCCESS, data)
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

export default {
  createInterview,
  updateInterview,
  findInterviewById,
  findAllInterview,
  findInterviewMainCategory,
  deleteInterview,
};
