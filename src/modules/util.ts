import logger from '../log/logger';

// modules/util.ts -> success, fail 메세지 가공
const util = {
    success: (status: number, message: string, data?: any) => {
        logger.info('success : ', { 
            status,
            success: true,
            message,
            data, 
        });
        return {
            status,
            success: true,
            message,
            data,
        };
    },
    fail: (status: number, message: string, data?: any) => {
        logger.error('fail : ', { 
            status,
            success: false,
            message,
        });
        return {
            status,
            success: false,
            message,
        };
    },
};

export default util;