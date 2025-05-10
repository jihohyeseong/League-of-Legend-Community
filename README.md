# League of Legend Community (게임 커뮤니티)
2024 3rd Project
 <h3>🖥️[PC화면 시연동영상](https://youtu.be/1jigB8RXR2E)</h3>
<h3><a href="https://www.notion.so/1a71563ef7ee804f9ca4d326716b3402?v=1a71563ef7ee8144b95b000c8162b838">
      📜 REST API 명세서</a></h3>
<br/>

## 목차
<details open>
  <summary><h2>📋 Table of Contents</h2></summary>
  <ul>
    <li><a href="#개요">개요</a></li>
    <li><a href="#개발자소개">개발자소개</a></li>
    <li><a href="#새로-적용한-기능">새로 적용한 기능</a></li>
    <li><a href="#%EF%B8%8F-기술-스택">기술 스택</a></li>
    <li><a href="#프로젝트-구조">프로젝트 구조</a></li>
    <li><a href="#구현화면">구현화면</a></li>
  </ul> 
</details>
<br/>

## 개요
우리나라의 인기 게임인 리그 오브 레전드에 대해 자유롭게 의견을 나눌 수 있는 깔끔한 디자인의 웹 커뮤니티 구현
<br/>
<br/>

## 개발자소개
+ **이혜성**: Backend Spring담당
+ **송승엽**: Frontend React담당
<br/>
<br/>

## 새로 적용한 기능
+ **SPRINGBOOT** : <br>1. 단일 토큰 JWT를 활용한 로그인 방식에서 OAuth2 JWT 토큰을 활용한 네이버, 구글, 카카오 로그인 방식으로 변경<br>2. WebSocket STOMP를 활용한 실시간 채팅 구현<br>3. AWS S3를 활용하여 이미지 업로드 개선<br>4. 페이징 처리 객체 활용
+ **REACT** : <br>1. 상태 관리 라이브러리 : zustand<br> 2. 실시간 채팅 구현 : Socket JS<br> 3. 비동기 데이터 처리 : tanstack query<br>4. 스타일(CSS) : styled-components
<br/>

## ✔️ 기술 스택
<div>
<table>
   <tr>
      <td colspan="2" align="center">
        Language
      </td>
      <td colspan="4">
        <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
        <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
      </td>
   </tr>
   <tr>
      <td colspan="2" align="center">
        Library & Framework
      </td>
      <td colspan="4">
        <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
        <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
        <img src="https://img.shields.io/badge/spring data jpa-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
        <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 
        <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
        <img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
        <img src="https://img.shields.io/badge/socket-C93CD7?style=for-the-badge&logo=socket&logoColor=white">
      </td>
   </tr>
   <tr>
      <td colspan="2" align="center">
        Database
      </td>
      <td colspan="4">
        <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
        <img src="https://img.shields.io/badge/amazon rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
      </td>
   </tr>
   <tr>
      <td colspan="2" align="center">
        Tool
      </td>
      <td colspan="4">
          <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
          <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
      </td>
   </tr>
   <tr>
      <td colspan="2" align="center">
        etc.
      </td>
      <td colspan="4">
          <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
      </td>
   </tr>
</table>
</div>
<br/>

## 프로젝트 구조
![프로젝트 구조](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EA%B8%B0%EB%8A%A5%EA%B5%AC%EC%84%B1.png)
<br/>

## 구현화면
1. 로그인 모달창
![로그인](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140005.png)
2. 메인화면
![팅메인화면 실시간채](https://github.com/user-attachments/assets/ab62c13c-a163-4189-8c78-d05b2eed81d9)
3. 상세페이지
![지상세페이](https://github.com/user-attachments/assets/4fccd067-f5dd-4002-97cf-3498e21e1b20)
4. 글 작성
![글작성](https://github.com/user-attachments/assets/51c8a4b5-2934-4d8d-930c-8790cd11a948)
5. 마이페이지
![마이페이지](https://github.com/user-attachments/assets/a2318698-96d4-4597-8e84-f25f786ced57)
