import React from 'react';
import animationData from './json/Instagram.json';
import { useLottie } from 'lottie-react';

const InstagramAnimation = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return <div className="w-32 mt-14 h-32">{View}</div>;
};

export default InstagramAnimation;
