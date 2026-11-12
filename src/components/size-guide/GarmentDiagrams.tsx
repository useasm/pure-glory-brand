import type { ReactNode, SVGProps } from 'react';

// Outline garment diagrams for the size guide. All share one 200×210 viewBox.

const svgProps: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 200 210',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  style: { width: '100%', height: 'auto', maxWidth: 300 },
};

/** Dashed measurement line with end ticks. */
function Measure({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const vertical = x1 === x2;
  const t = 4; // tick half-length
  return (
    <g strokeDasharray="4 4" opacity={0.85}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} strokeDasharray="none" />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} strokeDasharray="none" />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} strokeDasharray="none" />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} strokeDasharray="none" />
        </>
      )}
    </g>
  );
}

function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill="var(--surface-card)" strokeDasharray="none" />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fontSize={10}
        fontFamily="var(--font-sans)"
        fill="currentColor"
        stroke="none"
      >
        {children}
      </text>
    </g>
  );
}

// shared torso outline for the t-shirt, shirt and hoodie
const torso = (
  <path d="M78 32 58 40c-8 3-14 9-16 18l-9 34 22 7 5-16v92h80v-92l5 16 22-7-9-34c-2-9-8-15-16-18l-20-8" />
);

export function TShirtDiagram() {
  return (
    <svg {...svgProps}>
      {torso}
      {/* neckline */}
      <path d="M78 32c4 8 10 12 22 12s18-4 22-12" />
      {/* A: chest width */}
      <Measure x1={62} y1={84} x2={138} y2={84} />
      <Label x={100} y={84}>A</Label>
      {/* B: body length */}
      <Measure x1={160} y1={40} x2={160} y2={175} />
      <Label x={160} y={108}>B</Label>
      {/* C: sleeve length */}
      <Measure x1={48} y1={44} x2={38} y2={88} />
      <Label x={35} y={62}>C</Label>
    </svg>
  );
}

export function ShirtDiagram() {
  return (
    <svg {...svgProps}>
      <path d="M78 32 58 40c-8 3-13 9-14 18l-5 78 16 3 3-30v66h84v-66l3 30 16-3-5-78c-1-9-6-15-14-18l-20-8" />
      {/* collar */}
      <path d="M78 32l10 14 12-8 12 8 10-14" />
      <path d="M78 32l6-6h32l6 6" />
      {/* button placket */}
      <line x1={100} y1={46} x2={100} y2={175} strokeDasharray="none" opacity={0.5} />
      <circle cx={100} cy={70} r={1.2} />
      <circle cx={100} cy={100} r={1.2} />
      <circle cx={100} cy={130} r={1.2} />
      {/* A: chest */}
      <Measure x1={60} y1={86} x2={140} y2={86} />
      <Label x={100} y={86}>A</Label>
      {/* B: length */}
      <Measure x1={162} y1={40} x2={162} y2={175} />
      <Label x={162} y={108}>B</Label>
      {/* C: sleeve */}
      <Measure x1={50} y1={44} x2={42} y2={132} />
      <Label x={37} y={88}>C</Label>
    </svg>
  );
}

export function HoodieDiagram() {
  return (
    <svg {...svgProps}>
      {torso}
      {/* hood */}
      <path d="M78 32c-4-16 8-26 22-26s26 10 22 26c-6 8-13 12-22 12s-16-4-22-12Z" />
      {/* kangaroo pocket */}
      <path d="M76 132h48v34l-10 6h-28l-10-6v-34Z" opacity={0.7} />
      {/* drawstrings */}
      <path d="M94 44v14M106 44v14" opacity={0.7} />
      {/* A: chest */}
      <Measure x1={62} y1={92} x2={138} y2={92} />
      <Label x={100} y={92}>A</Label>
      {/* B: length */}
      <Measure x1={162} y1={34} x2={162} y2={175} />
      <Label x={162} y={104}>B</Label>
      {/* C: sleeve */}
      <Measure x1={48} y1={44} x2={38} y2={88} />
      <Label x={35} y={62}>C</Label>
    </svg>
  );
}

export function JacketDiagram() {
  return (
    <svg {...svgProps}>
      <path d="M76 30 56 40c-8 4-13 10-14 19l-5 76 16 4 3-28v64h88v-64l3 28 16-4-5-76c-1-9-6-15-14-19l-20-10" />
      {/* stand collar */}
      <path d="M76 30c2-6 8-9 24-9s22 3 24 9l-14 14h-20L76 30Z" />
      {/* zip */}
      <line x1={100} y1={44} x2={100} y2={175} strokeDasharray="2 3" />
      {/* pockets */}
      <path d="M74 128l14 16M126 128l-14 16" opacity={0.7} />
      {/* A: chest */}
      <Measure x1={58} y1={88} x2={142} y2={88} />
      <Label x={100} y={88}>A</Label>
      {/* B: length */}
      <Measure x1={164} y1={38} x2={164} y2={175} />
      <Label x={164} y={106}>B</Label>
      {/* C: sleeve */}
      <Measure x1={48} y1={46} x2={40} y2={134} />
      <Label x={35} y={90}>C</Label>
    </svg>
  );
}

export function TrousersDiagram() {
  return (
    <svg {...svgProps}>
      <path d="M68 24h64l8 62-18 100h-20l-2-88-2 88H78L60 86l8-62Z" />
      {/* waistband */}
      <line x1={68} y1={36} x2={132} y2={36} strokeDasharray="none" opacity={0.6} />
      {/* A: waist */}
      <Measure x1={68} y1={30} x2={132} y2={30} />
      <Label x={100} y={30}>A</Label>
      {/* B: hips */}
      <Measure x1={64} y1={70} x2={136} y2={70} />
      <Label x={100} y={70}>B</Label>
      {/* C: outseam */}
      <Measure x1={160} y1={26} x2={160} y2={186} />
      <Label x={160} y={106}>C</Label>
      {/* D: inseam */}
      <Measure x1={100} y1={100} x2={84} y2={184} />
      <Label x={86} y={140}>D</Label>
    </svg>
  );
}
