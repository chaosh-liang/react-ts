import { useState, useEffect } from 'react';

export const useDebounce = (params: any, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(params);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(params), delay);
    return () => clearTimeout(timer); // 执行时机：组件销毁 | 下一次执行此 useEffect
  }, [params, delay]);
  return debouncedValue;
};
