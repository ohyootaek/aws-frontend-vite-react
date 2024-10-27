import React from 'react'
import './styles/Home.css'

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='section'>
        <h1>
          Welcome to
          <br /> YOOTAEK Site.
        </h1>
        <h2>-사이트 소개-</h2>
        <p>
          이 프로젝트는 이전에 다루었던 기술 스택을 복습하고 연습하기 위해 구현한
          애플리케이션입니다.
          <br />
          각 기술에 대해 배운 내용을 기록하고, 개인적으로 느낀 점과 사용법을 정리해 보았습니다.
          <br />
          <br />
          개발하면서 단순히 담당 메뉴의 기능을 이해하는 데 그치지 않고, 배포 후 발생할 수 있는
          다양한 문제를 경험해 보고자 웹사이트를 직접 제작하고 배포했습니다.
        </p>
      </div>
    </div>
  )
}

export default Home
