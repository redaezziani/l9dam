"use client";
import React from 'react';

type VariantType = 'red' | 'blue' | 'green' | 'yellow' | 'purple';
type SizeType = 'sm' | 'md' | 'lg';

interface PixelButtonProps {
  children: React.ReactNode;
  variant?: VariantType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: SizeType;
}

const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  variant = 'red',
  onClick,
  className = '',
  disabled = false,
  size = 'md',
}) => {
  const variants = {
    red: {
      bg: '#ea5462',
      bgHover: '#f26471',
      bgActive: '#d04451',
      highlight: '#ffa8b0',
      shadow: '#a8303d',
    },
    blue: {
      bg: '#5a90ea',
      bgHover: '#6aa0fa',
      bgActive: '#4a80ca',
      highlight: '#a8c8ff',
      shadow: '#3060a8',
    },
    green: {
      bg: '#4ecb4e',
      bgHover: '#5edb5e',
      bgActive: '#3ebb3e',
      highlight: '#8ef78e',
      shadow: '#2e8b2e',
    },
    yellow: {
      bg: '#f5d142',
      bgHover: '#ffe152',
      bgActive: '#e5c132',
      highlight: '#fff8a8',
      shadow: '#b59122',
    },
    purple: {
      bg: '#9b5aea',
      bgHover: '#ab6afa',
      bgActive: '#8b4aca',
      highlight: '#c8a8ff',
      shadow: '#6030a8',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-xl',
  };

  const colors = variants[variant] || variants['red'];

  const buttonStyle = {
    backgroundColor: colors.bg,
    clipPath: `polygon(
      0 4px,
      4px 4px,
      4px 0,
      calc(100% - 4px) 0,
      calc(100% - 4px) 4px,
      100% 4px,
      100% calc(100% - 4px),
      calc(100% - 4px) calc(100% - 4px),
      calc(100% - 4px) 100%,
      4px 100%,
      4px calc(100% - 4px),
      0 calc(100% - 4px)
    )`,
    boxShadow: `
      0 -4px 0 0 #000,
      4px -4px 0 0 #000,
      -4px 0 0 0 #000,
      calc(100% - 0px) 0 0 0 #000,
      0 calc(100% - 0px) 0 0 #000,
      4px calc(100% - 0px) 0 0 #000,
      calc(100% - 0px) calc(100% - 0px) 0 0 #000,
      4px 0 0 0 ${colors.highlight} inset,
      8px 0 0 0 ${colors.highlight} inset,
      0 4px 0 0 ${colors.highlight} inset,
      0 8px 0 0 ${colors.highlight} inset,
      -4px 0 0 0 ${colors.shadow} inset,
      -8px 0 0 0 ${colors.shadow} inset,
      0 -4px 0 0 ${colors.shadow} inset,
      0 -8px 0 0 ${colors.shadow} inset
    `,
  };

  const beforeStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    background: 'transparent',
    clipPath: `polygon(
      0 4px,
      4px 4px,
      4px 0,
      calc(100% - 4px) 0,
      calc(100% - 4px) 4px,
      100% 4px,
      100% calc(100% - 4px),
      calc(100% - 4px) calc(100% - 4px),
      calc(100% - 4px) 100%,
      4px 100%,
      4px calc(100% - 4px),
      0 calc(100% - 4px)
    )`,
    boxShadow: `
      0 0 0 4px #000,
      calc(100% + 4px) 0 0 4px #000,
      0 calc(100% + 4px) 0 4px #000,
      calc(100% + 4px) calc(100% + 4px) 0 4px #000
    `,
    pointerEvents: 'none',
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const getButtonStyle = () => {
    if (isActive) {
      return {
        ...buttonStyle,
        backgroundColor: colors.bgActive,
        transform: 'translate(1px, 1px)',
        boxShadow: `
          0 -4px 0 0 #000,
          4px -4px 0 0 #000,
          -4px 0 0 0 #000,
          calc(100% - 0px) 0 0 0 #000,
          0 calc(100% - 0px) 0 0 #000,
          4px calc(100% - 0px) 0 0 #000,
          calc(100% - 0px) calc(100% - 0px) 0 0 #000,
          4px 0 0 0 ${colors.shadow} inset,
          8px 0 0 0 ${colors.shadow} inset,
          0 4px 0 0 ${colors.shadow} inset,
          0 8px 0 0 ${colors.shadow} inset,
          -4px 0 0 0 ${colors.highlight} inset,
          -8px 0 0 0 ${colors.highlight} inset,
          0 -4px 0 0 ${colors.highlight} inset,
          0 -8px 0 0 ${colors.highlight} inset
        `,
      };
    }
    if (isHovered) {
      return {
        ...buttonStyle,
        backgroundColor: colors.bgHover,
        transform: 'translate(-1px, -1px)',
      };
    }
    return buttonStyle;
  };

  return (
    <button
      className={`relative font-bold text-white uppercase border-0 cursor-pointer transition-all duration-100 ${sizes[size]} ${className}`}
      style={getButtonStyle()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled}
    >
      <span style={beforeStyle}></span>
      {children}
    </button>
  );
};

export default PixelButton;
