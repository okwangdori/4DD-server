import { unitTitleBaseResponseDto } from "../interfaces/common/unitTitleBaseResponseDto";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleResponseDto } from "../interfaces/unitTitle/unitTitleResponseDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import { unitDetailBaseResponseDto } from "../interfaces/common/unitDetailBaseResponseDto";
import { unitDetailCreateDto } from "../interfaces/unitDetail/unitDetailCreateDto";
import { unitDetailResponseDto } from "../interfaces/unitDetail/unitDetailResponseDto";
import { unitDetailUpdateDto } from "../interfaces/unitDetail/unitDetailUpdateDto";
import UnitTitle from "../models/UnitTitle";
import UnitDetail from "../models/UnitDetail";
import logger from "../log/logger";

const createUnitDetail = async (
  unitDetailCreateDto: unitDetailCreateDto
): Promise<unitDetailBaseResponseDto> => {
  try {
    const unitDetail = new UnitDetail({
      title: unitDetailCreateDto.title,
      detail_content: unitDetailCreateDto.detail_content,
      useYN: unitDetailCreateDto.useYN,
    });

    await unitDetail.save();

    const data = {
      _id: unitDetail.id,
    };

    return data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const updateUnitDetail = async (
  unitDetailId: string,
  unitDetailUpdateDto: unitDetailUpdateDto
): Promise<unitDetailUpdateDto | null> => {
  try {
    await UnitDetail.findByIdAndUpdate(unitDetailId, unitDetailUpdateDto); // update 로직
    const unitDetail = await findUnitDetailById(unitDetailId); // update 된 정보를 불러오는 로직
    // null이 될 경우를 처리해줘야 한다.
    if (!unitDetail) {
      return null;
    }
    return unitDetail;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUnitDetailById = async (
  unitDetailId: string
): Promise<unitDetailResponseDto | null> => {
  try {
    const unitDetail = await UnitDetail.findById(unitDetailId);

    if (!unitDetail) {
      return null;
    }
    return unitDetail;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findUnitDetailAll = async () => {
  try {
    let unitTitle = await UnitTitle.find({ menu_level: 1 })
      .populate("children")
      .sort({ category_number: 1, dateTimeOfUnitTitleCreating: -1 })
      .exec();

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
      });
    }

    return list;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const deleteUnitDetail = async (
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

export default {
  createUnitDetail,
  updateUnitDetail,
  findUnitDetailById,
  findUnitDetailAll,
  deleteUnitDetail,
};
