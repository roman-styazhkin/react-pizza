import React from "react";
import { useState, useEffect } from "react";
import styles from "./RippleButton.module.scss";

const RippleButton: React.FC = ({
  children,
  onClick,
  rippleColor,
  disabled,
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const onClickShowRippleEffect = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onClick && onClick(e);
  };

  const rippleStyles = {
    left: coords.x,
    top: coords.y,
    backgroundColor: rippleColor,
  };

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={styles.root}
      disabled={disabled}
      onClick={onClickShowRippleEffect}
    >
      {isRippling ? (
        <span className={styles.root__ripple} style={rippleStyles} />
      ) : null}
      <span className={styles.root__content}>{children}</span>
    </button>
  );
};

export default RippleButton;
