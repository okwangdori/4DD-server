import { userSubInfoBaseResponseDto } from "../interfaces/common/userSubInfoBaseResponseDto";
import { userSubInfoCreateDto } from "../interfaces/userSubInfo/userSubInfoCreateDto";
import { userSubInfoResponseDto } from "../interfaces/userSubInfo/userSubInfoResponseDto";
import { userSubInfoUpdateDto } from "../interfaces/userSubInfo/userSubInfoUpdateDto";
import UserSubInfo from "../models/UserSubInfo";
import logger from "../log/logger";

const createUserSubInfo = async (
  userSubInfoCreateDto: userSubInfoCreateDto
): Promise<userSubInfoBaseResponseDto> => {
  try {
    const userSubInfo = new UserSubInfo({
      views: userSubInfoCreateDto.views,
      likes: userSubInfoCreateDto.likes,
      unit_total_count: userSubInfoCreateDto.unit_total_count,
    });

    await userSubInfo.save();

    const data = {
      _id: userSubInfo.id,
    };

    return data;
  } catch (error) {
    logger.error("userSubInfoService > createUserSubInfo : error : ", error);
    throw error;
  }
};

const updateUserSubInfo = async (
  userSubInfoId: string,
  userSubInfoUpdateDto: userSubInfoUpdateDto
): Promise<userSubInfoUpdateDto | null> => {
  try {
    await UserSubInfo.findByIdAndUpdate(userSubInfoId, userSubInfoUpdateDto);
    const userSubInfo = await findUserSubInfoById(userSubInfoId);
    // null이 될 경우를 처리해줘야 한다.
    if (!userSubInfo) {
      logger.error(
        "userSubInfoService > updateUserSubInfo > userSubInfo is null : error",
        userSubInfo
      );
      return null;
    }
    return userSubInfo;
  } catch (error) {
    logger.error("userSubInfoService > updateUserSubInfo : error : ", error);
    throw error;
  }
};

const findUserSubInfoById = async (
  userSubInfoId: string
): Promise<userSubInfoResponseDto | null> => {
  try {
    const userSubInfo = await UserSubInfo.findById(userSubInfoId);

    if (!userSubInfo) {
      return null;
    }
    return userSubInfo;
  } catch (error) {
    logger.error("userSubInfoService > findUserSubInfoById : error : ", error);
    throw error;
  }
};

const deleteUserSubInfo = async (
  userSubInfoId: string
): Promise<userSubInfoResponseDto | null> => {
  try {
    const userSubInfo = await UserSubInfo.findByIdAndDelete(userSubInfoId);
    if (!userSubInfo) {
      return null;
    }
    return userSubInfo;
  } catch (error) {
    logger.error("userSubInfoService > deleteUserSubInfo : error : ", error);
    throw error;
  }
};

export default {
  createUserSubInfo,
  updateUserSubInfo,
  findUserSubInfoById,
  deleteUserSubInfo,
};
