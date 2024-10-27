import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import './styles/Home.css';

ScrollMagicPluginGsap(ScrollMagic, gsap);

const Home: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    if (sectionRef.current) {
      // GSAP 애니메이션 설정
      const animation = gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 }, // 초기값
          { opacity: 1, y: 0, duration: 1 } // 애니메이션 종료값 및 시간
      );

      const fadeOut = gsap.to(sectionRef.current, {
        opacity: 0,
        y: -50, // 위쪽으로 이동하며 사라짐
        duration: 1,
        ease: "power2.out",
      });

      // ScrollMagic 씬 설정
      new ScrollMagic.Scene({
        triggerElement: sectionRef.current,
        triggerHook: 0.8, // 화면 80% 지점에서 애니메이션 시작
        reverse: false, // 스크롤을 되돌리면 애니메이션이 재실행되지 않음
      })
      .setTween(animation)
      .addTo(controller);
    }

    return () => {
      controller.destroy(); // 컴포넌트 언마운트 시 컨트롤러 정리
    };
  }, []);

  return (
      <div className="home">
        <div ref={sectionRef} className="section">
          <h1>Welcom to<br/> YOOTAEK Site.</h1>
          <h2>사이트 소개.</h2>
          <p>이 프로젝트는 이전에 다루었던 기술 스택을 복습하고 연습하기 위해 구현한 애플리케이션입니다.<br/>
            각 기술에 대해 배운 내용을 기록하고, 개인적으로 느낀 점과 사용법을 정리해 보았습니다.</p>
        </div>
      </div>
  );
};

export default Home;
