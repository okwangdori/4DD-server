import { unitTitleBaseResponseDto } from "../interfaces/common/unitTitleBaseResponseDto";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleResponseDto } from "../interfaces/unitTitle/unitTitleResponseDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import UnitTitle from "../models/UnitTitle";
import logger from "../log/logger";

const createUnitTitle = async (unitTitleCreateDto: unitTitleCreateDto): Promise<unitTitleBaseResponseDto> => {
    try {
    	// create를 위해 각 filed명에 값들을 할당시켜준다.
        const unitTitle = new UnitTitle({
            title: unitTitleCreateDto.title,
            content: unitTitleCreateDto.content,
            additional: {
                category: unitTitleCreateDto.additional?.category,
                category_number: unitTitleCreateDto.additional?.category_number,
            }
        });
        await unitTitle.save();

        const data = {
            _id: unitTitle.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUnitTitle = async (unitTitleId: string, unitTitleUpdateDto: unitTitleUpdateDto): Promise<unitTitleUpdateDto | null> => {
    try {
        await UnitTitle.findByIdAndUpdate(unitTitleId, unitTitleUpdateDto); // update 로직
        const unitTitle = await findUnitTitleById(unitTitleId); // update 된 정보를 불러오는 로직
        // null이 될 경우를 처리해줘야 한다.
		if (!unitTitle) {
            return null;
        }
        return unitTitle;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findUnitTitleById = async (unitTitleId: string): Promise<unitTitleResponseDto | null> => {
    try {
        const unitTitle = await UnitTitle.findById(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findUnitTitleAll = async () => {
    // const unitTitle = await UnitTitle.find({}, function (err:any, data:any) {
    //     if (!err) {
    //         res.render("unitTitle", { "unitTitle": data });
    //     } else {
    //         throw err;
    //     }
    // }).clone().catch(function(err){ console.log(err)});

    // return unitTitle;


    // ctx.body = posts
    // .map(post => post.toJSON())
    // .map(post => ({
    //   ...post,
    //   body: removeHtmlAndShorten(post.body),
    // }));




    try {
        var unitTitle = await UnitTitle.find({});
        var test;
        if (!unitTitle) {
            return null;
        }else{
            test = unitTitle.map(
                unitTitle => unitTitle.toJSON()).map(unitTitle => ({
                    ...unitTitle
                }));
        }

        return test;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const deleteUnitTitle = async (unitTitleId: string): Promise<unitTitleResponseDto | null> => {
    try {
        const unitTitle = await UnitTitle.findByIdAndDelete(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default {
    createUnitTitle,
    updateUnitTitle,
    findUnitTitleById,
    findUnitTitleAll,
    deleteUnitTitle,
}