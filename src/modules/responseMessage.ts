// modules/responseMessage.ts -> response message 가공
const message = {
  NULL_VALUE: "필요한 값이 없습니다.",
  NOT_FOUND: "존재하지 않는 자원",
  BAD_REQUEST: "잘못된 요청",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",
  EXPIRED_REFRESH_TOKEN: "토큰 만료",

  // 포스팅
  READ_POST_SUCCESS: "포스팅 조회 성공",
  CREATE_POST_SUCCESS: "포스팅 생성 성공",
  DELETE_POST_SUCCESS: "포스팅 삭제 성공",
  UPDATE_POST_SUCCESS: "포스팅 수정 성공",

  // 단원
  READ_UNIT_TITLE_SUCCESS: "단원 조회 성공",
  CREATE_UNIT_TITLE_SUCCESS: "단원 생성 성공",
  DELETE_UNIT_TITLE_SUCCESS: "단원 삭제 성공",
  UPDATE_UNIT_TITLE_SUCCESS: "단원 수정 성공",
  READ_UNIT_DETAIL_SUCCESS: "상세 조회 성공",
  CREATE_UNIT_DETAIL_SUCCESS: "상세 생성 성공",
  DELETE_UNIT_DETAIL_SUCCESS: "상세 삭제 성공",
  UPDATE_UNIT_DETAIL_SUCCESS: "상세 수정 성공",

  // 사용자
  LOGIN_SUCCESS: '로그인 성공',
  LOGOUT_SUCCESS: '로그아웃 성공',
  READ_USER_SUCCESS: '사용자 조회 성공',
  CREATE_USER_SUCCESS: '회원가입 성공',
  DELETE_USER_SUCCESS: '사용자 삭제 성공',
  UPDATE_USER_SUCCESS: '사용자 수정 성공',
  INVALID_EMAIL_OR_PASSWORD: '유효하지 않은 이메일 또는 비밀번호입니다.',
  CHANGE_PASSWORD_SUCCESS: '비밀번호 변경 성공',
  ALREADY_EXIST_NAME: '이미 존재하는 닉네임입니다.',
  ALREADY_EXIST_EMAIL: '이미 존재하는 이메일입니다.',
  PASSWORD_MISMATCH: '현재 비밀번호가 일치하지 않습니다.'
};

export default message;
