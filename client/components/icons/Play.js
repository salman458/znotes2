import React from "react";

const convertColor = (hex) => {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);

  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);

  const rScaled = r / 255.0;
  const gScaled = g / 255.0;
  const bScaled = b / 255.0;

  return `0 0 0 0 ${rScaled}
  0 0 0 0 ${gScaled}
  0 0 0 0 ${bScaled}
  0 0 0 1 0`;
};

const Discord = (props) => (
  <svg
    className="playIcon"
    width="188px"
    height="188px"
    viewBox="0 0 188 188"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <circle id="path-1" cx="41" cy="41" r="41" />
      <filter
        x="-102.4%"
        y="-102.4%"
        width="304.9%"
        height="304.9%"
        filterUnits="objectBoundingBox"
        id="filter-2"
      >
        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation="28"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values={convertColor(props.primaryColor || "#87F1C3")}
          type="matrix"
          in="shadowBlurOuter1"
        />
      </filter>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="dark-dashboard" transform="translate(-88.000000, -373.000000)">
        <g id="resume" transform="translate(141.000000, 259.000000)">
          <g id="Group-8" transform="translate(0.000000, 167.000000)">
            <g id="Oval">
              <use
                fill="#051017"
                fillOpacity="1"
                filter="url(#filter-2)"
                xlinkHref="#path-1"
                className="play-glow"
              />
              <use
                fill={props.primaryColor || "#87F1C3"}
                fillRule="evenodd"
                xlinkHref="#path-1"
              />
            </g>
            <polygon
              id="Triangle"
              fill={props.secondaryColor || "#FFFFFF"}
              transform="translate(43.500000, 42.000000) rotate(90.000000) translate(-43.500000, -42.000000) "
              points="43.5 28 61 56 26 56"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Discord;
