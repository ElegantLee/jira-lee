import React, { useEffect, useState } from 'react';

const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的 num 值：${num}`;
    return function unmount() {
      console.log(message);
    };
  };

  return effect;
};

const add = test();
const unmount = add();
add();
add();
add();

unmount();

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => {
    setNum(num + 1); // 这里会报错，因为num还没有定义
  };

  useEffect(() => {
    const id = setInterval(() => {
      console.log('num in setInterval: ', num);
    }, 1000);

    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
