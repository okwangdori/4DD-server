import mongoose from "mongoose";

export interface interviewCreateDto {
  //CS지식, 라이브러리, 프레임워크, 개발언어, 데이터베이스, 등...
  main_category: string;
  main_category_code: number;

  //cs지식 : 데이터베이스, 자료구조, 알고리즘 등...
  //라이브러리,프레임워크 : React, Vue, Angular, TypeScript, SPRING 등...
  //개발언어 : Javascript, JAVA, python, ruby 등...
  //데이터베이스 : mongodb, oracle, mysql, PostgreSQL 등...
  middle_category: string;
  middle_category_code: number;

  //cs지식 - 데이터베이스 : 스키마의 구조, RDBMS와 NOSQL 차이, 등 의 직접적인 설명
  //라이브러리,프레임워크 - React : React의 구조 ReactDom, Redux 등 의 직접적인 설명
  //개발언어 - Javascript : JS문법, 버전별 문법, getElement등 문법사용방법 등 의 직접적인 설명
  //데이터베이스 - mongodb : 몽고DB의 직접적인 설명
  sub_category: string;
  sub_category_code: number;

  //객관식 : true , 주관식 : false
  multiple_choice: boolean;

  //해당 인터뷰의 실제 내용
  interview_contents: string;
  //해당 인터뷰 내용에 대한 맞는 답변
  interview_answer: string;

  //해당 인터뷰 내용에 대한 답변의 보기 (답이 될 수 없음)
  //객관식(multiple_choice : true) :
  //5지선다 랜덤 퀴즈를 위해 최소 4가지 이상 입력받고 5가지 이상 있을경우 interview_answer과 함께 나머지 4개의 보기는 answer_example에서 랜덤으로 추출 select
  //주관식(multiple_choice : false) :
  //answer_example은 없어도 되지만 interview_answer에서 적절한 해답을 적었는지 유효성검사 필요
  answer_example?: any[];

  writer: string;
  useYN?: string;
  dateTimeOfPosting?: Date;
}
