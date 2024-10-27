import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import './styles/Skill.css';

// @ts-ignore
ScrollMagicPluginGsap(ScrollMagic, gsap);

import certbot from '../assets/certbot.svg';
import docker from '../assets/docker.svg';
import ec2 from '../assets/ec2.svg';
import github from '../assets/github.svg';
import nginx from '../assets/nginx.svg';
import oracle from '../assets/oracle.svg';
import postgresql from '../assets/postgresql.svg';
import rds from '../assets/rds.svg';
import react from '../assets/react.svg';
import redis from '../assets/redis.svg';
import springboot from '../assets/springboot.svg';
import typescript from '../assets/typescript.svg';
import vue3 from '../assets/vue3.svg';

interface SkillItemProps {
  name: string;
  icon: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, icon }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    if (itemRef.current) {
      const animation = gsap.fromTo(
          itemRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1 }
      );

      new ScrollMagic.Scene({
        triggerElement: itemRef.current,
        triggerHook: 0.8,
        reverse: true,
      })
      .setTween(animation)
      .addTo(controller);
    }

    return () => {
      controller.destroy();
    };
  }, []);

  return (
      <div ref={itemRef} className="skill-item">
        <img src={icon} alt={`${name} icon`} className="skill-icon" />
        <p>{name}</p>
      </div>
  );
};

const Skill: React.FC = () => {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    // h2 애니메이션
    if (h1Ref.current) {
      const animation = gsap.fromTo(
          h1Ref.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1 }
      );

      new ScrollMagic.Scene({
        triggerElement: h1Ref.current,
        triggerHook: 0.9,
        reverse: true,
      })
      .setTween(animation)
      .addTo(controller);
    }

    // h2 애니메이션
    h2Refs.current.forEach((h2Ref) => {
      if (h2Ref) {
        const animation = gsap.fromTo(
            h2Ref,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 }
        );

        new ScrollMagic.Scene({
          triggerElement: h2Ref,
          triggerHook: 0.9,
          reverse: true,
        })
        .setTween(animation)
        .addTo(controller);
      }
    });

    return () => {
      controller.destroy();
    };
  }, []);

  const frontendSkills = [
    { name: 'Vite-React', icon: react },
    { name: 'Vue3', icon: vue3 },
    { name: 'Typescript', icon: typescript },
  ];

  const backendSkills = [
    { name: 'Springboot', icon: springboot },
    { name: 'Oracle', icon: oracle },
    { name: 'PostgreSQL', icon: postgresql },
    { name: 'Redis', icon: redis },
  ];

  const deploySkills = [
    { name: 'AWS-EC2', icon: ec2 },
    { name: 'AWS-RDS', icon: rds },
    { name: 'Docker', icon: docker },
    { name: 'Docker-compose', icon: docker },
    { name: 'Github-actions', icon: github },
    { name: 'Nginx', icon: nginx },
    { name: 'Certbot', icon: certbot },
  ];

  return (
      <div className="skills">
        <h1 ref={h1Ref}>Skills</h1>

        <div className="skill-category">
          <h2 ref={(el) => (h2Refs.current[0] = el)}>Deploy</h2>
          <div className="skill-list">
            {deploySkills.map((skill) => (
                <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className="skill-category">
          <h2 ref={(el) => (h2Refs.current[1] = el)}>Frontend</h2>
          <div className="skill-list">
            {frontendSkills.map((skill) => (
                <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        <div className="skill-category">
          <h2 ref={(el) => (h2Refs.current[2] = el)}>Backend</h2>
          <div className="skill-list">
            {backendSkills.map((skill) => (
                <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

      </div>
  );
};

export default Skill;
