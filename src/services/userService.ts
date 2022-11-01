import { userBaseResponseDto } from "../interfaces/common/userBaseResponseDto";
import { userCreateDto } from "../interfaces/user/userCreateDto";
import { userResponseDto } from "../interfaces/user/userResponseDto";
import { userUpdateDto } from "../interfaces/user/userUpdateDto";
import User from "../models/user";
import logger from "../log/logger";


const createUser = async (userCreateDto: userCreateDto): Promise<userBaseResponseDto> => {
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

const findUserByEmail = async (email: string): Promise<userResponseDto | null> => {
    try {
        const user = await User.findById(email);
        if (!user) {
            return null;
        }
        return user;
        
    } catch (error) {
        console.log(error);
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
    createUser,
    updateUser,
    findUserById,
    findUserByEmail,
    deleteUser,
}