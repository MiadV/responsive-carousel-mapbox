import * as React from 'react';

export default function PinnedImage({
  imgSrc,
  boxSize = 18,
}: {
  imgSrc: string;
  boxSize?: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <svg
        width={(boxSize * 1.2).toString()}
        viewBox="0 0 66 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="matrix(1.58593,0,0,1.58593,0,0)">
          <path
            d="M41,20.5C41,20.627 40.999,20.753 40.997,20.88L41,20.88C41,42.519 20.5,51.63 20.5,51.63C20.5,51.63 0,42.519 0,20.88L0.003,20.88C0.001,20.753 0,20.627 0,20.5C0,9.178 9.178,0 20.5,0C31.822,0 41,9.178 41,20.5ZM20.5,34.926C28.467,34.926 34.926,28.467 34.926,20.5C34.926,12.533 28.467,6.074 20.5,6.074C12.533,6.074 6.074,12.533 6.074,20.5C6.074,28.467 12.533,34.926 20.5,34.926Z"
            fill="#ffb801"
          ></path>
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          width: boxSize,
          height: boxSize,
          top: 5,
          left: '50%',
          borderRadius: '50%',
          transform: ' translateX(-50%)',
          overflow: 'hidden',
          zIndex: -1,
        }}
      >
        <img
          src={imgSrc}
          alt=" "
          style={{
            objectFit: 'cover',
            height: '100%',
            maxWidth: '100%',
          }}
        />
      </div>
    </div>
  );
}
