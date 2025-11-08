import React from 'react';
import animationData from './json/Whatsapp.json';
import { useLottie } from 'lottie-react';

const WhatsappAnimation = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return <div className="w-14 h-14">{View}</div>;
};

export default WhatsappAnimation;
