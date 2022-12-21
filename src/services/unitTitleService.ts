import { unitTitleBaseResponseDto } from "../interfaces/common/unitTitleBaseResponseDto";
import { unitTitleCreateDto } from "../interfaces/unitTitle/unitTitleCreateDto";
import { unitTitleResponseDto } from "../interfaces/unitTitle/unitTitleResponseDto";
import { unitTitleUpdateDto } from "../interfaces/unitTitle/unitTitleUpdateDto";
import UnitTitle from "../models/UnitTitle";
import logger from "../log/logger";
import mongoose from "mongoose";
import convertToTrees from "../utills/treeStructure";

const createUnitTitle = async (unitTitleCreateDto: unitTitleCreateDto): Promise<unitTitleBaseResponseDto> => {
    try {
    	// create를 위해 각 filed명에 값들을 할당시켜준다.
        const unitTitle = new UnitTitle({
            title: unitTitleCreateDto.title,
            content: unitTitleCreateDto.content,
            category: unitTitleCreateDto.category,
            category_number: unitTitleCreateDto.category_number,
            menu_level : unitTitleCreateDto.menu_level,
            menu_id: unitTitleCreateDto.menu_id,
            parents_menu_id : unitTitleCreateDto.parents_menu_id,
            useYN : unitTitleCreateDto.useYN,
            additional: {

            }
        });
        await unitTitle.save();

        const data = {
            _id: unitTitle.id
        };

        return data;
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
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
        logger.error(error);
        throw error;
    }
}

const findUnitTitleTree = async (unitTitleId: string): Promise<unitTitleResponseDto | null | any[]> => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        
        const unitTitle = await UnitTitle.aggregate([
            {'$match': {'_id': new ObjectId(unitTitleId)}}, 
            {'$graphLookup': {
                'from': 'unittitles', 
                'startWith': '$parents_menu_id', 
                'connectFromField': 'parents_menu_id', 
                'connectToField': 'menu_id', 
                'depthField': 'level', 
                'as': 'childMenu'
                }
            }, 
            {'$unwind': {
                'path': '$childMenu', 
                'preserveNullAndEmptyArrays': true
                }
            }, 
            {'$sort': {
                'childMenu.level': -1
                }
            }, 
            {'$group': {
                '_id': '$_id', 
                'title': {'$first': '$title'}, 
                'content': {'$first': '$content'}, 
                'category': {'$first': '$category'}, 
                'category_number': {'$first': '$category_number'}, 
                'parents_menu_id': {'$first': '$parents_menu_id'}, 
                'menu_id': {'$first': '$menu_id'}, 
                'childMenu': {
                    '$push': {
                        '_id': '$childMenu._id', 
                        'title': '$childMenu.title', 
                        'content': '$childMenu.content', 
                        'category': '$childMenu.category', 
                        'category_number': '$childMenu.category_number', 
                        'parents_menu_id': '$childMenu.parents_menu_id', 
                        'menu_id': '$childMenu.menu_id', 
                        'level': '$childMenu.level'
                    }
                }
            }
            }, 
            {'$addFields': {
                'childMenu': {
                    '$reduce': {
                        'input': '$childMenu', 
                        'initialValue': {
                            'level': -1, 
                            'presentChild': [], 
                            'prevChild': []
                        }, 
                        'in': {
                            '$let': {
                                'vars': {
                                    'prev': {
                                        '$cond': [
                                            {'$eq': ['$$value.level', '$$this.level']}, 
                                            '$$value.prevChild', '$$value.presentChild'
                                        ]
                                    }, 
                                    'current': {
                                        '$cond': [
                                            {'$eq': ['$$value.level', '$$this.level']}, 
                                            '$$value.presentChild', 
                                            []
                                        ]
                                    }
                                }, 
                                'in': {
                                    'level': '$$this.level', 
                                    'prevChild': '$$prev', 
                                    'presentChild': {
                                        '$concatArrays': [
                                            '$$current', [{
                                                '_id': '$$this._id', 
                                                'title': '$$this.title', 
                                                'content': '$$this.content', 
                                                'category': '$$this.category', 
                                                'category_number': '$$this.category_number', 
                                                'parents_menu_id': '$$this.parents_menu_id', 
                                                'menu_id': '$$this.menu_id', 
                                                'level': '$$this.level', 
                                                'childMenu': {
                                                    '$filter': {
                                                        'input': '$$prev', 
                                                        'as': 'e', 
                                                        'cond': {'$eq': ['$$e.menu_id', '$$this.parents_menu_id']}
                                                    }
                                                }
                                            }]
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
            }, 
            {'$addFields': {'childMenu': '$childMenu.presentChild'}}
        ]);
        
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
        
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const findUnitTitleAll = async () => {
    try {
        let unitTitle = await UnitTitle.find({menu_level : 1}).populate('children')
            .sort( { "category_number": 1, "dateTimeOfUnitTitleCreating": -1 } ).exec();

        //오브젝트용 가공 샘플
        // interface ObjType {
        //     [key: string]: any[]
        // }
        // let obj : ObjType = {};
        let list : any[] = [];

        if (!unitTitle) {
            return null;
        }else{
            unitTitle.map((e, i) => {
                if(list[e.category_number]) {
                    list[e.category_number].push(e);
                }else{
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
}

const deleteUnitTitle = async (unitTitleId: string): Promise<unitTitleResponseDto | null> => {
    try {
        const unitTitle = await UnitTitle.findByIdAndDelete(unitTitleId);
        if (!unitTitle) {
            return null;
        }
        return unitTitle;
    } catch (error) {
        logger.error(error)
        throw error;
    }
}

export default {
    createUnitTitle,
    updateUnitTitle,
    findUnitTitleById,
    findUnitTitleTree,
    findUnitTitleAll,
    deleteUnitTitle,
}