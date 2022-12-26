import { userBaseResponseDto } from "../interfaces/common/userBaseResponseDto";
import { userCreateDto } from "../interfaces/user/userCreateDto";
import { userResponseDto } from "../interfaces/user/userResponseDto";
import { userUpdateDto } from "../interfaces/user/userUpdateDto";
import { userInfoDto } from "../interfaces/user/userInfoDto";
import User from "../models/user";
import { createToken } from "../utills/jwt.utill";
import logger from "../log/logger";

interface userData {
    id: string;
    name?: string;
    email?: string;
    // accessToken: string;
    // refreshToken: string;
}

const checkName = async (userInfoDto: userInfoDto): Promise<userInfoDto | null> => {
    try {
        const data = await User.findOne({name: userInfoDto.name});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const checkEmail = async (userInfoDto: userInfoDto): Promise<userInfoDto | null> => {
    try {
        const data = await User.findOne({email: userInfoDto.email});
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const register = async (userCreateDto: userCreateDto): Promise<userBaseResponseDto> => {
    try {
    	// create를 위해 각 filed명에 값들을 할당시켜준다.
        const user = new User({
            name: userCreateDto.name,
            email: userCreateDto.email,
            password: userCreateDto.password
        });
        await user.save();

        const data = {
            _id: user.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async (userId: string, userUpdateDto: userUpdateDto): Promise<userUpdateDto | null> => {
    try {
        await User.findByIdAndUpdate(userId, userUpdateDto); // update 로직
        const user = await findUserById(userId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
		if (!user) {
            return null;
        }
        return user;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findUserById = async (userId: string): Promise<userResponseDto | null> => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return null;
        }
        return user;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getUsers = async (): Promise<any> => {
    try {
        const users = await User.find();
        if (!users) {
            return null;
        }
        return users;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const login = async (userCreateDto: userCreateDto): Promise<userResponseDto | null> => {        
    try {
        const user = await User.findOne({email: userCreateDto.email});     
        // 계정, 비밀번호 체크
        if (!user || user.password !== userCreateDto.password) {
            return null;
        }
        const tokenOption = {
            id: user._id,
            email: user.email
        };       
        const userData: userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            // accessToken: createToken('access', tokenOption),
            // refreshToken: createToken('refresh', tokenOption)
        }
        return userData;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const changePassword = async (userUpdateDto: userUpdateDto): Promise<userResponseDto | null> => {
    logger.info("########## id : "+ userUpdateDto._id);
    logger.info("########## password : "+ userUpdateDto.password);
    try {
        const user = await User.findByIdAndUpdate(userUpdateDto._id, {password: userUpdateDto.password});
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const deleteUser = async (userId: string): Promise<userResponseDto | null> => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default {
    checkName,
    checkEmail,
    register,
    updateUser,
    findUserById,
    getUsers,
    login,
    changePassword,
    deleteUser,
}