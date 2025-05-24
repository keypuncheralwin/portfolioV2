import * as React from "react";
import { SVGProps } from "react";

const ProNotesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={256}
    height={256}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_1_64)">
      <rect x={25} y={25} width={206} height={206} rx={46} fill="#060606" />
      <rect
        x={25}
        y={25}
        width={206}
        height={206}
        rx={46}
        fill="url(#paint0_linear_1_64)"
      />
    </g>
    <path
      d="M94.1378 64.3379C93.472 65.0031 93.25 76.2381 93.25 114.009V162.866L100.204 177.058C105.753 188.293 107.677 191.545 109.156 192.21C113.003 193.91 114.409 192.21 121.067 177.649L127.208 164.344L127.06 114.083L126.912 63.8207H120.993H115.075L114.853 112.161C114.779 147.27 114.927 160.797 115.519 161.462C115.963 162.053 117.072 162.497 117.96 162.497C121.363 162.497 121.807 163.605 119.662 166.858C118.552 168.558 117.368 169.888 117.072 169.888C116.703 169.888 115.519 168.853 114.335 167.671C113.151 166.414 111.598 165.453 110.858 165.453C110.192 165.453 108.416 166.414 107.085 167.671C105.679 168.853 104.348 169.888 104.052 169.888C103.46 169.888 99.1687 163.975 99.1687 163.088C99.1687 162.792 100.5 162.497 102.128 162.497C104.274 162.497 105.235 162.127 105.827 161.092C106.345 160.058 106.493 143.87 106.419 111.717L106.197 63.8207L100.648 63.5989C96.9494 63.451 94.8038 63.6728 94.1378 64.3379Z"
      fill="white"
    />
    <path
      d="M136.1 64.0143C135.469 64.5054 135.258 67.6612 135.399 77.55L135.609 90.4547L139.817 90.8756C146.409 91.5068 150.826 94.5223 153.07 100.063C157.138 109.742 149.915 120.963 139.606 120.963C138.064 120.963 136.451 121.384 136.03 121.945C135.469 122.576 135.258 126.784 135.399 135.41L135.609 147.964L140.307 148.175C158.68 149.016 176.843 134.358 180.77 115.492C181.822 110.303 181.681 101.115 180.489 95.7848C176.913 80.7764 163.449 67.7314 148.231 64.5053C142.832 63.3831 137.502 63.1727 136.1 64.0143Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_d_1_64"
        x={19.5}
        y={22.25}
        width={217}
        height={217}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.75} />
        <feGaussianBlur stdDeviation={2.75} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1_64"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1_64"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1_64"
        x1={128}
        y1={25}
        x2={128}
        y2={231}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0} />
        <stop offset={1} stopOpacity={0.2} />
      </linearGradient>
    </defs>
  </svg>
);
export default ProNotesIcon;
