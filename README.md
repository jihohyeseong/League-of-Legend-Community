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
+ 로그인 모달창<br/><br/>
![로그인](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140005.png)
<br/><br/>OAuth2를 활용해 구글 / 네이버 / 카카오 로그인 연동을 할 수 있습니다.<br/><br/>
+ 메인화면<br/><br/>
![메인화면](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140019.png)
<br/><br/>저희 커뮤니티의 메인 화면입니다.<br/><br/>
+ 상단바<br/><br/>
![상단바](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140506.png)
<br/><br/>기본값은 최신글 보기이며 10추글 보기 버튼을 통해 추천을 10개 이상 받은 게시글들만 볼 수 있습니다.<br/>
또한 검색기능으로 제목 / 작성자 / 내용 / 제목 + 내용 으로 원하는 글을 검색할 수 있습니다.<br/><br/>
+ 사이드바<br/><br/>
![사이드바](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140520.png)
<br/><br/>로컬 스토리지를 활용해 최근 본 글 3개를 저장하는 기능을 구현했습니다.<br/>
또한 카테고리별로 원하는 게시글을 볼 수 있습니다.<br/><br/>
+글 상세정보<br/><br/>
![글 상세정보](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140219.png)
<br/><br/>게시글을 클릭했을 때 보이는 화면입니다.<br/>
글은 물론 이미지, 동영상도 첨부할 수 있습니다.<br/><br/>
+ 댓글<br/><br/>
![댓글](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140234.png)
<br/><br/>게시글에 댓글을 작성할 수 있습니다. 답글쓰기를 눌러 댓글에 답글도 달 수 있으며 좋아요 / 싫어요 역시 가능합니다.<br/>
댓글보기는 기본 추천순으로 정렬되며 최신순 버튼으로 최신 댓글도 확인할 수 있습니다.<br/><br/>
+ 글 작성<br/><br/>
![글 작성](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140259.png)
<br/><br/>CKEditor를 통해 글을 작성할 수 있습니다.<br/>
글씨크기, 굵기는물론 이미지, 동영상도 첨부하여 작성할 수 있습니다.<br/><br/>
+ 마이페이지<br/><br/>
![마이페이지](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140034.png)
<br/><br/>마이페이지에는 내가 추천한 글, 내가 쓴 글, 나의 댓글들을 확인할 수 있고 링크를 통해 바로 해당 게시글로 접근할 수 있습니다.<br/>
또한 닉네임과 응원팀 이미지도 수정할 수 있으며 회원탈퇴도 가능합니다.<br/><br/>
+ 실시간 채팅<br/><br/>
![실시간채팅](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140334.png)
<br/><br/>웹소켓으로 구현한 실시간 채팅입니다.<br/>
실시간으로 커뮤니티에 접속한 모든 사람들과 의견을 공유할 수 있습니다.<br/><br/>
+ 실시간 알림<br/><br/>
![실시간알림](https://github.com/jihohyeseong/League-of-Legend-Community/blob/main/images/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-05-10%20140428.png)
<br/><br/>웹소켓으로 구현한 실시간 알림입니다.<br/>
다른사람이 내가 작성한 게시글에 댓글을 달거나, 나의 댓글에 답글이 달렸을 때 5초간 실시간 알림이 보여집니다.<br/><br/>

