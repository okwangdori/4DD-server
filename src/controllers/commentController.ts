import express, { Request, Response } from "express";
import { commentCreateDto } from "../interfaces/comment/commentCreateDto";
import { commentUpdateDto } from "../interfaces/comment/commentUpdateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { commentService } from "../services";
import logger from "../log/logger";

const createComment = async (req: Request, res: Response): Promise<void> => {
  const commentCreateDto: commentCreateDto = req.body;
  try {
    const data = await commentService.createComment(commentCreateDto);
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

const updateComment = async (req: Request, res: Response): Promise<void> => {
  const commentUpdateDto: commentUpdateDto = req.body;
  const commentId: any = req.query.commentId;
  try {
    const data = await commentService.updateComment(
      commentId,
      commentUpdateDto
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

const updateCommentTree = async (
  req: Request,
  res: Response
): Promise<void> => {
  const commentUpdateDto: commentUpdateDto = req.body;
  const { commentId } = req.params;

  try {
    const data = await commentService.updateCommentTree(
      commentId,
      commentUpdateDto
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

const findPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { postId } = req.params;
  try {
    const data = await commentService.findPostById(postId);
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

const findCommentTree = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId } = req.params;
  try {
    const data = await commentService.findCommentTree(commentId);
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

const findCommentAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await commentService.findCommentAll();
    logger.info("#### data : "+ data)
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

const deleteComment = async (req: Request, res: Response): Promise<void> => {  
  const commentId: any = req.query.commentId;
  try {
    const data = await commentService.deleteComment(commentId);
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
  createComment,
  updateComment,
  updateCommentTree,
  findPostById,
  findCommentTree,
  findCommentAll,
  deleteComment,
};

