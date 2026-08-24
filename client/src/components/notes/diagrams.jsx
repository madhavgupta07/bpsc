/**
 * Reusable bilingual-friendly SVG study diagrams.
 * All diagrams inherit text color via currentColor and use brand accents,
 * so they render correctly in light and dark mode.
 */

const S = {
  stroke: 'currentColor',
  sw: 1.6,
  accent: '#6366f1',
  accent2: '#a855f7',
  boxFill: '#6366f114',
};

const Label = ({ x, y, children, size = 11, bold }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={bold ? 700 : 500} fill="currentColor">
    {children}
  </text>
);

const Box = ({ x, y, w, h, r = 6, dash }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} strokeDasharray={dash} />
);

/* ---------------- Logic gates ---------------- */
function GateAnd({ x, y }) {
  return (
    <g>
      <path d={`M${x},${y} h20 a18,18 0 0 1 0,36 h-20 z`} fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} />
      <Label x={x + 26} y={y + 23}>AND</Label>
    </g>
  );
}
function GateOr({ x, y, label = 'OR' }) {
  return (
    <g>
      <path d={`M${x},${y} q14,18 0,36 q22,-4 34,-18 q-12,-14 -34,-18 z`} fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} />
      <Label x={x + 24} y={y + 23}>{label}</Label>
    </g>
  );
}

export function LogicGates() {
  return (
    <svg viewBox="0 0 430 250" className="w-full" role="img">
      {/* Row 1: AND, OR */}
      <GateAnd x={40} y={30} />
      <GateOr x={230} y={30} />
      {/* Row 2: NOT, XOR */}
      <g transform="translate(40,110)">
        <path d="M0,10 h22 l26,16 -26,16 h-22 z" fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} />
        <circle cx="52" cy="26" r="4" fill="#fff" stroke={S.accent} strokeWidth={1.5} />
        <Label x={30} y={56}>NOT</Label>
      </g>
      <GateOr x={230} y={110} label="XOR" />
      <g><line x1={288} y1={128} x2={294} y2={128} stroke={S.stroke} /><circle cx="298" cy="128" r="4" fill="#fff" stroke={S.accent} strokeWidth={1.5} /></g>
      {/* Row 3: NAND, NOR (bubble on output) */}
      <g transform="translate(40,190)">
        <path d="M0,0 h20 a18,18 0 0 1 0,36 h-20 z" fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} />
        <circle cx="42" cy="18" r="4" fill="#fff" stroke={S.accent} strokeWidth={1.5} />
        <Label x={28} y={54}>NAND</Label>
      </g>
      <g transform="translate(230,190)">
        <path d="M0,0 q14,18 0,36 q22,-4 34,-18 q-12,-14 -34,-18 z" fill={S.boxFill} stroke={S.accent} strokeWidth={S.sw} />
        <circle cx="38" cy="18" r="4" fill="#fff" stroke={S.accent} strokeWidth={1.5} />
        <Label x={24} y={54}>NOR</Label>
      </g>
      <Label x={215} y={240} size={10}>
        ○ bubble = inversion · NAND / NOR = Universal gates
      </Label>
    </svg>
  );
}

/* ---------------- Computer block diagram ---------------- */
export function ComputerBlock() {
  return (
    <svg viewBox="0 0 430 240" className="w-full" role="img">
      <Box x={150} y={20} w={130} h={90} />
      <Label x={215} y={42} bold>CPU</Label>
      <Box x={165} y={52} w={46} h={44} r={4} dash="4 3" />
      <Label x={188} y={70}>ALU</Label>
      <Box x={219} y={52} w={46} h={44} r={4} dash="4 3" />
      <Label x={242} y={70}>CU</Label>
      <Label x={215} y={92} size={9}>Registers</Label>
      <Box x={20} y={160} w={120} h={50} />
      <Label x={80} y={182}>Input</Label>
      <Label x={80} y={198} size={9}>Keyboard · Mouse</Label>
      <Box x={155} y={160} w={120} h={50} />
      <Label x={215} y={182}>Memory</Label>
      <Label x={215} y={198} size={9}>RAM · ROM</Label>
      <Box x={290} y={160} w={120} h={50} />
      <Label x={350} y={182}>Output</Label>
      <Label x={350} y={198} size={9}>Monitor · Printer</Label>
      <line x1={80} y1={160} x2={185} y2={110} stroke={S.accent2} strokeWidth={1.8} markerEnd="" />
      <line x1={350} y1={160} x2={245} y2={110} stroke={S.accent2} strokeWidth={1.8} />
      <line x1={215} y1={160} x2={215} y2={110} stroke={S.accent2} strokeWidth={1.8} />
      <Label x={330} y={135} size={10}>System Bus</Label>
      <Label x={215} y={228} size={8.5}>
        ALU = Arithmetic Logic Unit · CU = Control Unit
      </Label>
    </svg>
  );
}

/* ---------------- Memory hierarchy pyramid ---------------- */
export function MemoryHierarchy() {
  const layers = [
    ['Registers', '≈1 ns'],
    ['Cache (SRAM)', '≈1–10 ns'],
    ['Main Memory (DRAM)', '≈100 ns'],
    ['Secondary (SSD/HDD)', 'ms'],
    ['Tertiary / Backup', 'sec+'],
  ];
  const W = 420, rowH = 34, cx = W / 2;
  return (
    <svg viewBox="0 0 430 210" className="w-full" role="img">
      {layers.map(([name, speed], i) => {
        const w = 90 + i * 78;
        const y = 12 + i * rowH;
        return (
          <g key={name}>
            <rect x={cx - w / 2} y={y} width={w} height={rowH - 6} rx={5}
              fill={`${S.accent}${(255 - i * 45).toString(16).padStart(2, '0')}1f`}
              stroke={S.accent} strokeWidth={1.3} opacity={1 - i * 0.08} />
            <Label x={cx} y={y + 19} size={11} bold>{name}</Label>
            <text x={W - 4} y={y + 19} fontSize={9} textAnchor="end" fill="currentColor" opacity={0.65}>{speed}</text>
          </g>
        );
      })}
      <Label x={14} y={30} size={9}>↑ faster</Label>
      <Label x={14} y={196} size={9}>↓ cheaper</Label>
    </svg>
  );
}

/* ---------------- Instruction cycle ---------------- */
export function InstructionCycle() {
  return (
    <svg viewBox="0 0 430 200" className="w-full" role="img">
      <defs>
        <marker id="arrw" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={S.accent2} />
        </marker>
      </defs>
      <Box x={30} y={60} w={100} h={64} />
      <Label x={80} y={88} bold>Fetch</Label>
      <Label x={80} y={106} size={9}>PC → MAR</Label>
      <Box x={165} y={60} w={100} h={64} />
      <Label x={215} y={88} bold>Decode</Label>
      <Label x={215} y={106} size={9}>IR → Control</Label>
      <Box x={300} y={60} w={100} h={64} />
      <Label x={350} y={88} bold>Execute</Label>
      <Label x={350} y={106} size={9}>ALU ops</Label>
      <line x1={130} y1={92} x2={163} y2={92} stroke={S.accent2} strokeWidth={2} markerEnd="url(#arrw)" />
      <line x1={265} y1={92} x2={298} y2={92} stroke={S.accent2} strokeWidth={2} markerEnd="url(#arrw)" />
      <path d="M350,124 v40 h-270 v-38" fill="none" stroke={S.accent2} strokeWidth={2} markerEnd="url(#arrw)" />
      <Label x={215} y={182} size={10}>repeat until HALT</Label>
      <Label x={215} y={196} size={8}>
        PC = Program Counter · MAR = Memory Address Register · IR = Instruction Register
      </Label>
      <Label x={215} y={30} size={11} bold>Machine (Instruction) Cycle</Label>
    </svg>
  );
}

/* ---------------- OSI 7-layer stack ---------------- */
export function OsiModel() {
  const layers = [
    ['7 · Application', 'HTTP, FTP, SMTP, DNS'],
    ['6 · Presentation', 'Encryption, SSL/TLS'],
    ['5 · Session', 'Dialog control'],
    ['4 · Transport', 'TCP, UDP · ports'],
    ['3 · Network', 'IP · routers'],
    ['2 · Data Link', 'Ethernet · switches'],
    ['1 · Physical', 'Cables, bits'],
  ];
  return (
    <svg viewBox="0 0 430 235" className="w-full" role="img">
      {layers.map(([l, d], i) => (
        <g key={l}>
          <rect x={70} y={10 + i * 31} width={280} height={27} rx={5}
            fill={S.boxFill} stroke={i < 4 ? S.accent2 : S.accent} strokeWidth={1.3} />
          <Label x={140} y={28 + i * 31} size={11} bold>{l}</Label>
          <text x={340} y={28 + i * 31} fontSize={9.5} textAnchor="end" fill="currentColor" opacity={0.7}>{d}</text>
        </g>
      ))}
      <Label x={36} y={115} size={10}>Upper layers</Label>
      <Label x={36} y={205} size={10}>Lower layers</Label>
    </svg>
  );
}

/* ---------------- Network topologies ---------------- */
export function Topologies() {
  const node = (x, y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={7} fill={S.boxFill} stroke={S.accent} strokeWidth={1.5} />;
  return (
    <svg viewBox="0 0 430 210" className="w-full" role="img">
      {/* BUS */}
      <g transform="translate(15,15)">
        <line x1={10} y1={35} x2={150} y2={35} stroke={S.accent} strokeWidth={2.5} />
        {[25, 65, 105, 145].map((x) => (
          <g key={x}><line x1={x} y1={35} x2={x} y2={16} stroke={S.stroke} />{node(x, 12)}</g>
        ))}
        <Label x={80} y={62} size={11} bold>Bus</Label>
      </g>
      {/* STAR */}
      <g transform="translate(225,15)">
        {node(80, 35)}
        {[[35, 12], [125, 12], [35, 58], [125, 58]].map(([x, y]) => (
          <g key={`${x}${y}`}><line x1={80} y1={35} x2={x} y2={y} stroke={S.stroke} />{node(x, y)}</g>
        ))}
        <Label x={80} y={82} size={11} bold>Star</Label>
      </g>
      {/* RING */}
      <g transform="translate(15,110)">
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 80 + 38 * Math.cos(rad), y = 38 + 32 * Math.sin(rad);
          return node(x, y);
        })}
        <ellipse cx={80} cy={38} rx={38} ry={32} fill="none" stroke={S.accent} strokeWidth={1.5} />
        <Label x={80} y={92} size={11} bold>Ring</Label>
      </g>
      {/* MESH */}
      <g transform="translate(225,110)">
        {[[35, 12], [125, 12], [35, 58], [125, 58]].map(([x, y]) => node(x, y))}
        {[[35,12],[125,12],[35,58],[125,58]].map((a,i)=>[[35,12],[125,12],[35,58],[125,58]].map((b,j)=> i<j &&
          <line key={`${i}${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={S.stroke} strokeWidth={1} />
        ))}
        <Label x={80} y={92} size={11} bold>Mesh</Label>
      </g>
    </svg>
  );
}

/* ---------------- Waterfall SDLC ---------------- */
export function Waterfall() {
  const steps = [
    ['Requirements', 'आवश्यकताएँ'], ['Design', 'डिज़ाइन'], ['Implementation', 'क्रियान्वयन'],
    ['Testing', 'परीक्षण'], ['Deployment', 'तैनाती'], ['Maintenance', 'अनुरक्षण'],
  ];
  return (
    <svg viewBox="0 0 430 210" className="w-full" role="img">
      <defs>
        <marker id="wfArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={S.accent2} />
        </marker>
      </defs>
      {steps.map(([en, hi], i) => (
        <g key={en}>
          <Box x={18 + i * 66} y={16 + i * 30} w={104} h={34} r={5} />
          <Label x={70 + i * 66} y={30 + i * 30} size={10.5} bold>{en}</Label>
          <text x={70 + i * 66} y={44 + i * 30} fontSize={8.5} textAnchor="middle" fill="currentColor" opacity={0.7}>{hi}</text>
          {i < steps.length - 1 && (
            <line x1={112 + i * 66} y1={40 + i * 30} x2={126 + i * 66} y2={46 + i * 30 - 6} stroke={S.accent2} strokeWidth={1.8} markerEnd="url(#wfArr)" />
          )}
        </g>
      ))}
      <Label x={215} y={204} size={10}>Each phase completes before the next begins</Label>
    </svg>
  );
}

/* ---------------- OOP pillars ---------------- */
export function OopPillars() {
  const pillars = [
    ['Encapsulation', 'समावेशन'],
    ['Inheritance', 'वंशानुक्रम'],
    ['Polymorphism', 'बहुरूपता'],
    ['Abstraction', 'अमूर्तन'],
  ];
  return (
    <svg viewBox="0 0 430 150" className="w-full" role="img">
      <Box x={95} y={8} w={240} h={30} />
      <Label x={215} y={27} bold>Object-Oriented Programming</Label>
      {pillars.map(([en, hi], i) => (
        <g key={en}>
          <Box x={12 + i * 106} y={62} w={96} h={56} r={5} />
          <Label x={60 + i * 106} y={86} size={10.5} bold>{en}</Label>
          <text x={60 + i * 106} y={103} fontSize={9} textAnchor="middle" fill="currentColor" opacity={0.75}>{hi}</text>
        </g>
      ))}
      <line x1={215} y1={38} x2={60} y2={62} stroke={S.accent2} strokeWidth={1.5} />
      <line x1={215} y1={38} x2={166} y2={62} stroke={S.accent2} strokeWidth={1.5} />
      <line x1={215} y1={38} x2={264} y2={62} stroke={S.accent2} strokeWidth={1.5} />
      <line x1={215} y1={38} x2={370} y2={62} stroke={S.accent2} strokeWidth={1.5} />
    </svg>
  );
}

/* ---------------- Three-schema architecture ---------------- */
export function ThreeSchema() {
  const tier = (y, title, sub, color) => (
    <g>
      <Box x={90} y={y} w={250} h={40} r={6} />
      <rect x={90} y={y} width={250} height={40} rx={6} fill="none" stroke={color} strokeWidth={1.4} />
      <Label x={215} y={y + 17} size={11} bold>{title}</Label>
      <text x={215} y={y + 32} fontSize={9} textAnchor="middle" fill="currentColor" opacity={0.7}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 430 190" className="w-full" role="img">
      {tier(10, 'External Level', 'User views (many)', S.accent2)}
      <line x1={215} y1={50} x2={215} y2={72} stroke={S.accent2} strokeWidth={1.8} />
      {tier(74, 'Conceptual Level', 'Logical schema (one)', S.accent)}
      <line x1={215} y1={114} x2={215} y2={136} stroke={S.accent2} strokeWidth={1.8} />
      {tier(138, 'Internal Level', 'Physical storage (one)', S.accent)}
      <Label x={392} y={98} size={9}>↕ mappings</Label>
    </svg>
  );
}

/* ---------------- Registry ---------------- */
export const DIAGRAMS = {
  'logic-gates': LogicGates,
  'computer-block': ComputerBlock,
  'memory-hierarchy': MemoryHierarchy,
  'instruction-cycle': InstructionCycle,
  'osi-model': OsiModel,
  'topologies': Topologies,
  'waterfall': Waterfall,
  'oop-pillars': OopPillars,
  'three-schema': ThreeSchema,
};

export default DIAGRAMS;
