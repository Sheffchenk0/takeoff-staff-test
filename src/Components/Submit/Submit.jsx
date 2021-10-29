import React from 'react';
import './Submit.css';

export default function Submit(props) {
  return (
    <div className="submit" {...props}>
      <svg
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px">
        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
      </svg>
    </div>
  );
}
