import express, { Request, Response } from "express";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { unitTitleService } from "../services";
import logger from "../log/logger";

const createUnitTitle = async (req: Request, res: Response): Promise<void> => {
  const unitTitleCreateDto: unitTitleCreateDto = req.body;

  try {
    const data = await unitTitleService.createUnitTitle(unitTitleCreateDto);
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
  }
};

const updateUnitTitle = async (req: Request, res: Response): Promise<void> => {
  const unitTitleUpdateDto: unitTitleUpdateDto = req.body;
  const { unitTitleId } = req.params;

  try {
    const data = await unitTitleService.updateUnitTitle(
      unitTitleId,
      unitTitleUpdateDto
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
  }
};

const updateUnitTitleTree = async (
  req: Request,
  res: Response
): Promise<void> => {
  const unitTitleUpdateDto: unitTitleUpdateDto = req.body;
  const { unitTitleId } = req.params;

  try {
    const data = await unitTitleService.updateUnitTitleTree(
      unitTitleId,
      unitTitleUpdateDto
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
  }
};

const findUnitTitleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { unitTitleId } = req.params;

  try {
    const data = await unitTitleService.findUnitTitleById(unitTitleId);
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

const findUnitTitleTree = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { unitTitleId } = req.params;

  try {
    const data = await unitTitleService.findUnitTitleTree(unitTitleId);
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

const findUnitTitleAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await unitTitleService.findUnitTitleAll();
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

const deleteUnitTitle = async (req: Request, res: Response): Promise<void> => {
  const { unitTitleId } = req.params;

  try {
    const data = await unitTitleService.deleteUnitTitle(unitTitleId);
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
  createUnitTitle,
  updateUnitTitle,
  updateUnitTitleTree,
  findUnitTitleById,
  findUnitTitleTree,
  findUnitTitleAll,
  deleteUnitTitle,
};
