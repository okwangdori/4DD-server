import { commentBaseResponseDto } from "../interfaces/common/commentBaseResponseDto";
import { commentCreateDto } from "../interfaces/comment/commentCreateDto";
import { commentResponseDto } from "../interfaces/comment/commentResponseDto";
import { commentUpdateDto } from "../interfaces/comment/commentUpdateDto";
import { AnyBulkWriteOperation } from "mongodb";
import mongoose from "mongoose";
import logger from "../log/logger";
import Comment from "../models/Comment";
import moment from "moment";

const createComment = async (commentCreateDto: commentCreateDto): Promise<commentBaseResponseDto> => {
  try {
    // create를 위해 각 filed명에 값들을 할당시켜준다.
      const comment = new Comment({
          post_id: commentCreateDto.post_id,
          userName: commentCreateDto.userName,
          content: commentCreateDto.content,
          comment_level: commentCreateDto.comment_level,
          parentsComment: commentCreateDto?.parentsComment,
          dateTimeOfComment: moment().format("YYYY-MM-DD hh:mm:ss"),
          parent: commentCreateDto?.parent,
          children: commentCreateDto?.children,  
      });
      await comment.save();

      const data = {
          _id: comment.id
      };

      return data;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

const updateComment = async (commentId: string, commentUpdateDto: commentUpdateDto): Promise<commentUpdateDto | null> => {
  try {
      await Comment.findByIdAndUpdate(commentId, commentUpdateDto); // update 로직
      const comment = await findPostById(commentId); // update 된 정보를 불러오는 로직
      // null이 될 경우를 처리해줘야 한다.
      if (!comment) {
      return null;
      }
      return comment;
  } catch (error) {
      logger.error(error);
      throw error;
  }
};

const findPostById = async (postId: string): Promise<commentResponseDto | any> => {
try {
  const comment = await Comment.find({ post_id: postId });

  if (!comment) {
    return null;
  }
  return comment;
} catch (error) {
  logger.error(error);
  throw error;
}
};

let bulkArr: AnyBulkWriteOperation<any>[] = [];

const getChildId = (list: any[], useYN: string) => {
  list.map((v: { [key: string]: any }, i: number) => {
    bulkArr.push({
      updateOne: {
        filter: { _id: v._id },
        update: { $set: { useYN: useYN } },
      },
    });
    if (v.childComment.length > 0) {
      getChildId(v.childComment, useYN);
    }
  });
};

const updateCommentTree = async (commentId: string, commentUpdateDto: commentUpdateDto): Promise<commentUpdateDto | null> => {
    try {
        getChildId([commentUpdateDto.selectedComment], commentUpdateDto.content as string);
        await Comment.bulkWrite(bulkArr);
        const comment = await findPostById(commentId); // update 된 정보를 불러오는 로직

        // null이 될 경우를 처리해줘야 한다.
        if (!comment) {
         return null;
        }
        return comment;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

const findCommentTree = async (postId: string): Promise<commentResponseDto | null | any[]> => {
  try {  

    const comment = await Comment.aggregate([
      { $match: { post_id: (postId) } },      
      {
        $graphLookup: {
          from: "comments",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentsComment",
          depthField: "level",
          as: "childComment",
        },
      },
      {
        $unwind: {
          path: "$childComment",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "childComment.dateTimeOfComment": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          post_id: { $first: "$post_id" },
          userName: { $first: "$userName" },
          content: { $first: "$content" },
          dateTimeOfComment: { $first: "$dateTimeOfComment" },
          parentsComment: { $first: "$parentsComment" },
          isDelete: { $first: "$parentsComment" },
          childComment: {
            $push: {
              _id: "$childComment._id",
              post_id: "$childComment.post_id",
              userName: "$childComment.userName",
              content: "$childComment.content",
              dateTimeOfComment: "$childComment.dateTimeOfComment",
              parentsComment: "$childComment.parentsComment",
              isDelete: "$childComment.isDelete",
            },
          },
        },
      },
      {
        $addFields: {
          childComment: {
            $reduce: {
              input: "$childComment",
              initialValue: {
                level: -1,
                presentChild: [],
                prevChild: [],
              },
              in: {
                $let: {
                  vars: {
                    prev: {
                      $cond: [
                        { $eq: ["$$value.level", "$$this.level"] },
                        "$$value.prevChild",
                        "$$value.presentChild",
                      ],
                    },
                    current: {
                      $cond: [
                        { $eq: ["$$value.level", "$$this.level"] },
                        "$$value.presentChild",
                        [],
                      ],
                    },
                  },
                  in: {
                    level: "$$this.level",
                    prevChild: "$$prev",
                    presentChild: {
                      $concatArrays: [
                        "$$current",
                        [
                          {
                            _id: "$$this._id",
                            post_id: "$$this.post_id",
                            userName: "$$this.userName",
                            content: "$$this.content",
                            dateTimeOfComment: "$$this.dateTimeOfComment",
                            parentsComment: "$$this.parentsComment",
                            isDelete: "$$this.isDelete",
                            level: "$$this.level",
                            childComment: {
                              $filter: {
                                input: "$$prev",
                                as: "e",
                                cond: {
                                  $eq: [
                                    "$$e.parentsComment",
                                    "$$this._id",
                                  ],
                                },
                              },
                            },
                          },
                        ],
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      { $addFields: { childComment: "$childComment.presentChild" } },
      { $sort : { dateTimeOfComment : 1 } },
    ]);

    if (!comment) {
      return null;
    }
    return comment;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findCommentAll = async () => {
  try {
    let comment = await Comment.find({ comment_level: 0 })
      .populate("parentsComment")
      .sort({ dateTimeOfCommentCreating: -1 })
      .exec();

    //오브젝트용 가공 샘플
    // interface ObjType {
    //     [key: string]: any[]
    // }
    // let obj : ObjType = {};
    let list: any[] = [];

    if (!comment) {
      return null;
    } else {
      comment.map((e: any, i) => {
        if (list[i]) {
          list[i].push(e);
        } else {
          list[i] = [];
          list[i].push(e);
        }
        //오브젝트용 가공 샘플
        // if(obj[e.additional.category]) {
        //     obj[e.additional.category].push(e);
        // }else{
        //     obj[e.additional.category] = [];
        //     obj[e.additional.category].push(e);
        // }
      });
    }
    return list;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteComment = async (
  commentId: string
): Promise<commentResponseDto | any> => {
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, {isDeleted: true});
    if (!comment) {
      return null;
    }
    return comment;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  createComment,    
  updateComment,
  findPostById,
  updateCommentTree,
  findCommentTree,   
  findCommentAll,
  deleteComment,
}