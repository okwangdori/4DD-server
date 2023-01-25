import express, { Request, Response } from "express";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import { unitDetailCreateDto } from "../interfaces/unitDetail/unitDetailCreateDto";
import { unitDetailUpdateDto } from "../interfaces/unitDetail/unitDetailUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { unitDetailService, unitTitleService } from "../services";
import logger from "../log/logger";

const createUnitDetail = async (req: Request, res: Response): Promise<void> => {
  const unitDetailCreateDto: unitDetailCreateDto = req.body;
  let unitTitleCreateDto: unitTitleCreateDto = req.body;

  try {
    const data = await unitDetailService.createUnitDetail(unitDetailCreateDto);
    let resultData = null;

    if (data._id) {
      unitTitleCreateDto.content = data._id;
      resultData = await unitTitleService.createUnitTitle(unitTitleCreateDto);
    }

    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.CREATED,
          message.CREATE_UNIT_DETAIL_SUCCESS,
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

const updateUnitDetail = async (req: Request, res: Response): Promise<void> => {
  const unitDetailUpdateDto: unitDetailUpdateDto = req.body;
  const unitTitleUpdateDto: unitTitleUpdateDto = req.body;
  const { unitDetailId } = req.params;
  let titleData = null;
  let resultArr = [];

  try {
    const data = await unitDetailService.updateUnitDetail(
      unitDetailId,
      unitDetailUpdateDto
    );

    if (data) {
      resultArr.push(data);
      titleData = await unitTitleService.updateUnitTitle(
        JSON.stringify(unitDetailUpdateDto.parent_title_id),
        unitTitleUpdateDto
      );
    }

    resultArr.push(titleData);

    res
      .status(statusCode.CREATED)
      .send(
        util.success(
          statusCode.OK,
          message.UPDATE_UNIT_TITLE_SUCCESS,
          resultArr
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

const findUnitDetailById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { unitDetailId } = req.params;

  try {
    const data = await unitDetailService.findUnitDetailById(unitDetailId);
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
  }
};

const findUnitDetailAll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await unitDetailService.findUnitDetailAll();
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
  }
};

const deleteUnitDetail = async (req: Request, res: Response): Promise<void> => {
  const { unitDetailId } = req.params;

  try {
    const data = await unitDetailService.deleteUnitDetail(unitDetailId);
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
  }
};

export default {
  createUnitDetail,
  updateUnitDetail,
  findUnitDetailById,
  findUnitDetailAll,
  deleteUnitDetail,
};
