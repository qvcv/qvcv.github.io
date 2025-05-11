import React, { useRef, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Card from './shared/Card';

const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s ease-out';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <Card ref={cardRef} className="w-[600px] h-[400px] flex">
      <div className="flex flex-col w-full">
        <div className="flex p-8 items-start">
          <div className="mr-8">
            <div className="w-32 h-32 rounded-full bg-gray-700/50 overflow-hidden shadow-lg border-2 border-gray-600/50">
              <img 
                src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-2 text-white text-glow">
              <TypewriterText text="nixx" delay={150} deleteDelay={100} pauseDelayMin={700} pauseDelayMax={1400} />
            </h1>
            <div className="text-lg text-gray-400 text-glow-subtle">
              <TypewriterText text="alive?" delay={170} deleteDelay={120} pauseDelayMin={700} pauseDelayMax={1400} />
            </div>
          </div>
        </div>
        <div className="mt-auto mb-8 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;