// Home.tsx
import React from 'react'
import './styles/Home.css'

import certbot from '../assets/certbot.svg'
import docker from '../assets/docker.svg'
import ec2 from '../assets/ec2.svg'
import github from '../assets/github.svg'
import nginx from '../assets/nginx.svg'
import oracle from '../assets/oracle.svg'
import postgresql from '../assets/postgresql.svg'
import rds from '../assets/rds.svg'
import react from '../assets/react.svg'
import redis from '../assets/redis.svg'
import springboot from '../assets/springboot.svg'
import typescript from '../assets/typescript.svg'
import vue3 from '../assets/vue3.svg'
const SkillItem = ({ name, icon }) => {
  return (
    <div className='skill-item'>
      <img src={icon} alt={`${name} icon`} className='skill-icon' />
      <p>{name}</p>
    </div>
  )
}

const Home = () => {

  const frontendSkills = [
    { name: 'Vite-React', icon: react },
    { name: 'Vue3', icon: vue3 },
    { name: 'Typescript', icon: typescript },
  ]

  const backendSkills = [
    { name: 'Springboot', icon: springboot },
    { name: 'Oracle', icon: oracle },
    { name: 'PostgreSQL', icon: postgresql },
    { name: 'Redis', icon: redis },
  ]

  const deploySkills = [
    { name: 'AWS-EC2', icon: ec2 },
    { name: 'AWS-RDS', icon: rds },
    { name: 'Docker', icon: docker },
    { name: 'Docker-compose', icon: docker },
    { name: 'Github-actions', icon: github },
    { name: 'Nginx', icon: nginx },
    { name: 'Certbot', icon: certbot },
  ]

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
          다양한 문제를 경험해 보고자 웹사이트를 직접 제작하고 배포하였습니다.
        </p>
      </div>
      <div className='skills'>
        <h1>Skills</h1>

        <div className='skill-category'>
          <h2>Deploy</h2>
          <div className='skill-list'>
            {deploySkills.map((skill) => (
              <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className='skill-category'>
          <h2>Frontend</h2>
          <div className='skill-list'>
            {frontendSkills.map((skill) => (
              <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className='skill-category'>
          <h2>Backend</h2>
          <div className='skill-list'>
            {backendSkills.map((skill) => (
              <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
