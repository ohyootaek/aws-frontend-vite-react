import React from 'react';
import './styles/Home.css';



const Home: React.FC = () => {


  return (
      <div className="home">
        <div className="section">
          <h1>Welcom to<br/> YOOTAEK Site.</h1>
          <h2>사이트 소개.</h2>
          <p>이 프로젝트는 이전에 다루었던 기술 스택을 복습하고 연습하기 위해 구현한 애플리케이션입니다.<br/>
            각 기술에 대해 배운 내용을 기록하고, 개인적으로 느낀 점과 사용법을 정리해 보았습니다.</p>
        </div>
      </div>
  );
};

export default Home;
