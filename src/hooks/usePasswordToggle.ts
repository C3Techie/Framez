import { useState } from 'react';

export const usePasswordToggle = (initialState = true) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    isVisible,
    toggleVisibility,
    secureTextEntry: !isVisible,
  };
};