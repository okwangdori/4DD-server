import { unitTitleBaseResponseDto } from "../interfaces/common/unitTitleBaseResponseDto";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleResponseDto } from "../interfaces/unitTitle/unitTitleResponseDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import UnitTitle from "../models/UnitTitle";
import logger from "../log/logger";
import mongoose from "mongoose";
import { AnyBulkWriteOperation, BulkWriteResult } from "mongodb";

const createUnitTitle = async (
  unitTitleCreateDto: unitTitleCreateDto
): Promise<unitTitleBaseResponseDto> => {
  try {
    const unitTitle = new UnitTitle({
      title: unitTitleCreateDto.title,
      content: unitTitleCreateDto.content,
      category: unitTitleCreateDto.category,
      category_number: unitTitleCreateDto.category_number,
      parent_unit_id: unitTitleCreateDto.parent_unit_id,
      menu_level: unitTitleCreateDto.menu_level,
      useYN: unitTitleCreateDto.useYN,
    });
    await unitTitle.save();

    const data = {
      _id: unitTitle.id,
    };

    return data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateUnitTitle = async (
  unitTitleId: string,
  unitTitleUpdateDto: unitTitleUpdateDto
): Promise<unitTitleUpdateDto | null> => {
  try {
    await UnitTitle.findByIdAndUpdate(unitTitleId, unitTitleUpdateDto); // update 로직
    const unitTitle = await findUnitTitleById(unitTitleId); // update 된 정보를 불러오는 로직
    // null이 될 경우를 처리해줘야 한다.
    if (!unitTitle) {
      return null;
    }
    return unitTitle;
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
    if (v.childMenu.length > 0) {
      getChildId(v.childMenu, useYN);
    }
  });
};

const updateUnitTitleTree = async (
  unitTitleId: string,
  unitTitleUpdateDto: unitTitleUpdateDto
): Promise<unitTitleUpdateDto | null> => {
  try {
    getChildId(
      [unitTitleUpdateDto.selectedList],
      unitTitleUpdateDto.useYN as string
    );
    await UnitTitle.bulkWrite(bulkArr);
    const unitTitle = await findUnitTitleById(unitTitleId); // update 된 정보를 불러오는 로직

    // null이 될 경우를 처리해줘야 한다.
    if (!unitTitle) {
      return null;
    }
    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUnitTitleById = async (
  unitTitleId: string
): Promise<unitTitleResponseDto | null> => {
  try {
    const unitTitle = await UnitTitle.findById(unitTitleId);

    if (!unitTitle) {
      return null;
    }
    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUnitTitleAndDetailById = async (
  unitTitleId: string
): Promise<unitTitleResponseDto | null> => {
  try {
    // const unitTitle = await UnitTitle.findById(unitTitleId);

    let unitTitle = await UnitTitle.findById(unitTitleId)
      .populate("content")
      .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
      .exec();

    if (!unitTitle) {
      return null;
    }
    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUnitTitleTree = async (
  unitTitleId: string
): Promise<unitTitleResponseDto | null | any[]> => {
  try {
    const ObjectId = mongoose.Types.ObjectId;

    const unitTitle = await UnitTitle.aggregate([
      { $match: { _id: new ObjectId(unitTitleId) } },
      {
        $graphLookup: {
          from: "unittitles",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent_unit_id",
          depthField: "level",
          as: "childMenu",
        },
      },
      {
        $unwind: {
          path: "$childMenu",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "childMenu.level": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          category: { $first: "$category" },
          category_number: { $first: "$category_number" },
          parent_unit_id: { $first: "$parent_unit_id" },
          useYN: { $first: "$useYN" },
          menu_level: { $first: "$menu_level" },
          childMenu: {
            $push: {
              _id: "$childMenu._id",
              title: "$childMenu.title",
              content: "$childMenu.content",
              category: "$childMenu.category",
              category_number: "$childMenu.category_number",
              parent_unit_id: "$childMenu.parent_unit_id",
              useYN: "$childMenu.useYN",
              menu_level: "$childMenu.menu_level",
              level: "$childMenu.level",
            },
          },
        },
      },
      {
        $addFields: {
          childMenu: {
            $reduce: {
              input: "$childMenu",
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
                        {
                          $eq: ["$$value.level", "$$this.level"],
                        },
                        "$$value.prevChild",
                        "$$value.presentChild",
                      ],
                    },
                    current: {
                      $cond: [
                        {
                          $eq: ["$$value.level", "$$this.level"],
                        },
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
                            title: "$$this.title",
                            content: "$$this.content",
                            category: "$$this.category",
                            category_number: "$$this.category_number",
                            parent_unit_id: "$$this.parent_unit_id",
                            useYN: "$$this.useYN",
                            menu_level: "$$this.menu_level",
                            level: "$$this.level",
                            childMenu: {
                              $filter: {
                                input: "$$prev",
                                as: "e",
                                cond: {
                                  $eq: ["$$e.parent_unit_id", "$$this._id"],
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
      {
        $addFields: {
          childMenu: "$childMenu.presentChild",
        },
      },
    ]);

    if (!unitTitle) {
      return null;
    }
    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// TODO HWI 이미지는 aws s3와같은 storage에 저장하고 db에는 해당 이미지에 접근가능한경로를 저장
const findUnitTitleAll = async () => {
  try {
    let unitTitle = await UnitTitle.find({ menu_level: 1 })
      .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
      .exec();

    // .populate("children")

    //오브젝트용 가공 샘플
    // interface ObjType {
    //     [key: string]: any[]
    // }
    // let obj : ObjType = {};
    let list: any[] = [];

    if (!unitTitle) {
      return null;
    } else {
      unitTitle.map((e, i) => {
        if (list[e.category_number]) {
          list[e.category_number].push(e);
        } else {
          list[e.category_number] = [];
          list[e.category_number].push(e);
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

const deleteUnitTitle = async (
  unitTitleId: string
): Promise<unitTitleResponseDto | null> => {
  try {
    const unitTitle = await UnitTitle.findByIdAndDelete(unitTitleId);
    if (!unitTitle) {
      return null;
    }
    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

let deleteBulkArr: AnyBulkWriteOperation<any>[] = [];

const getDeleteChildId = (list: any[]) => {
  list.map((v: { [key: string]: any }, i: number) => {
    deleteBulkArr.push({
      deleteOne: {
        filter: { _id: v._id },
      },
    });
    if (v.childMenu.length > 0) {
      getDeleteChildId(v.childMenu);
    }
  });
};

const deleteUnitTitleTree = async (
  list: any[]
): Promise<BulkWriteResult | null> => {
  try {
    getDeleteChildId([list]);

    const unitTitle = await UnitTitle.bulkWrite(deleteBulkArr);

    if (!unitTitle) {
      return null;
    }

    return unitTitle;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default {
  createUnitTitle,
  updateUnitTitle,
  updateUnitTitleTree,
  findUnitTitleById,
  findUnitTitleAndDetailById,
  findUnitTitleTree,
  findUnitTitleAll,
  deleteUnitTitle,
  deleteUnitTitleTree,
};
