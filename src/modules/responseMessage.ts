// modules/responseMessage.ts -> response message 가공
const message = {
    NULL_VALUE: '필요한 값이 없습니다.',
    NOT_FOUND: '존재하지 않는 자원',
    BAD_REQUEST: '잘못된 요청',
    INTERNAL_SERVER_ERROR: '서버 내부 오류',

    // 포스팅 조회
    READ_POST_SUCCESS: '포스팅 조회 성공',
    CREATE_POST_SUCCESS: '포스팅 생성 성공',
    DELETE_POST_SUCCESS: '포스팅 삭제 성공',
    UPDATE_POST_SUCCESS: '포스팅 수정 성공',
}

export default message;