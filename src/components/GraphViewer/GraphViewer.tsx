import './GraphViewer.css';

interface Props {
  fn?: (x: number) => number;
  fns?: { fn: (x: number) => number; color: string; label?: string }[];
  xRange?: [number, number];
  yRange?: [number, number];
  width?: number;
  height?: number;
  showLine?: number;
  lineColor?: string;
  holes?: { x: number; y: number }[];
  title?: string;
}

function evalPoints(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  steps: number
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const step = (xMax - xMin) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * step;
    const y = fn(x);
    if (isFinite(y)) {
      pts.push({ x, y });
    } else if (pts.length > 0) {
      pts.push({ x, y: NaN });
    }
  }
  return pts;
}

export function GraphViewer({
  fn,
  fns,
  xRange = [-5, 5],
  yRange: yRangeProp,
  width = 400,
  height = 360,
  showLine,
  lineColor = '#ef4444',
  holes,
  title,
}: Props) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const allPts: { x: number; y: number }[] = [];
  if (fn) {
    allPts.push(...evalPoints(fn, xRange[0], xRange[1], 400));
  }
  if (fns) {
    for (const f of fns) {
      allPts.push(...evalPoints(f.fn, xRange[0], xRange[1], 400));
    }
  }

  let yMin = yRangeProp?.[0] ?? 0;
  let yMax = yRangeProp?.[1] ?? 0;
  if (!yRangeProp) {
    if (allPts.length > 0) {
      const valid = allPts.filter((p) => isFinite(p.y));
      if (valid.length > 0) {
        yMin = Math.min(...valid.map((p) => p.y));
        yMax = Math.max(...valid.map((p) => p.y));
      }
    }
    const range = yMax - yMin || 2;
    const pad = range * 0.15;
    yMin -= pad;
    yMax += pad;
  }

  const toScreenX = (x: number) =>
    padding.left + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const toScreenY = (y: number) =>
    padding.top + ((yMax - y) / (yMax - yMin)) * plotH;

  const gridXStep = Math.pow(10, Math.floor(Math.log10(xRange[1] - xRange[0])) - 1);
  const gridYStep = Math.pow(10, Math.floor(Math.log10(yMax - yMin)) - 1);

  const x0 = toScreenX(0);
  const y0 = toScreenY(0);

  function renderPath(fn: (x: number) => number, color: string) {
    const pts = evalPoints(fn, xRange[0], xRange[1], 400);
    const parts: string[] = [];
    let inGap = true;
    for (const p of pts) {
      if (!isFinite(p.y)) {
        inGap = true;
        continue;
      }
      const sx = toScreenX(p.x);
      const sy = toScreenY(p.y);
      if (sx < padding.left || sx > width - padding.right) continue;
      if (inGap) {
        parts.push(`M${sx},${sy}`);
        inGap = false;
      } else {
        parts.push(`L${sx},${sy}`);
      }
    }
    return <path d={parts.join('')} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />;
  }

  return (
    <div className="graph-viewer">
      {title && <div className="graph-title">{title}</div>}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect width={width} height={height} fill="#0f0f1a" rx={8} />
        <clipPath id="plot-clip">
          <rect x={padding.left} y={padding.top} width={plotW} height={plotH} />
        </clipPath>

        {/* Grid */}
        {Array.from({ length: Math.ceil((xRange[1] - xRange[0]) / gridXStep) + 1 }, (_, i) => {
          const x = Math.ceil(xRange[0] / gridXStep) * gridXStep + i * gridXStep;
          if (x < xRange[0] || x > xRange[1]) return null;
          const sx = toScreenX(x);
          return (
            <line key={`gx${x}`} x1={sx} y1={padding.top} x2={sx} y2={padding.top + plotH} stroke="#1e1e3a" strokeWidth={1} />
          );
        })}
        {Array.from({ length: Math.ceil((yMax - yMin) / gridYStep) + 1 }, (_, i) => {
          const y = Math.ceil(yMin / gridYStep) * gridYStep + i * gridYStep;
          if (y < yMin || y > yMax) return null;
          const sy = toScreenY(y);
          return (
            <line key={`gy${y}`} x1={padding.left} y1={sy} x2={padding.left + plotW} y2={sy} stroke="#1e1e3a" strokeWidth={1} />
          );
        })}

        {/* Axes */}
        {x0 >= padding.left && x0 <= padding.left + plotW && (
          <line x1={x0} y1={padding.top} x2={x0} y2={padding.top + plotH} stroke="#4a4a6a" strokeWidth={1.5} />
        )}
        {y0 >= padding.top && y0 <= padding.top + plotH && (
          <line x1={padding.left} y1={y0} x2={padding.left + plotW} y2={y0} stroke="#4a4a6a" strokeWidth={1.5} />
        )}

        {/* Axis labels */}
        {Array.from({ length: Math.ceil((xRange[1] - xRange[0]) / gridXStep) + 1 }, (_, i) => {
          const x = Math.ceil(xRange[0] / gridXStep) * gridXStep + i * gridXStep;
          if (x < xRange[0] || x > xRange[1]) return null;
          const sx = toScreenX(x);
          return (
            <text key={`lx${x}`} x={sx} y={height - 8} textAnchor="middle" fill="#6b7280" fontSize={11}>
              {x}
            </text>
          );
        })}
        {Array.from({ length: Math.ceil((yMax - yMin) / gridYStep) + 1 }, (_, i) => {
          const y = Math.ceil(yMin / gridYStep) * gridYStep + i * gridYStep;
          if (y < yMin || y > yMax) return null;
          const sy = toScreenY(y);
          return (
            <text key={`ly${y}`} x={padding.left - 8} y={sy + 4} textAnchor="end" fill="#6b7280" fontSize={11}>
              {y}
            </text>
          );
        })}

        {/* X label */}
        <text x={width - 10} y={y0 + 4} textAnchor="end" fill="#6b7280" fontSize={13}>x</text>
        <text x={x0 + 4} y={padding.top + 2} textAnchor="start" fill="#6b7280" fontSize={13}>y</text>

        {/* Functions */}
        <g clipPath="url(#plot-clip)">
          {fns?.map((f, i) => <g key={`fn${i}`}>{renderPath(f.fn, f.color)}</g>)}
          {fn && renderPath(fn, '#f59e0b')}

          {/* Horizontal line */}
          {showLine !== undefined && (
            <line
              x1={padding.left}
              y1={toScreenY(showLine)}
              x2={padding.left + plotW}
              y2={toScreenY(showLine)}
              stroke={lineColor}
              strokeWidth={2}
              strokeDasharray="6,4"
            />
          )}

          {/* Holes */}
          {holes?.map((h, i) => {
            const sx = toScreenX(h.x);
            const sy = toScreenY(h.y);
            if (sx < padding.left || sx > padding.left + plotW) return null;
            return (
              <g key={`hole${i}`}>
                <circle cx={sx} cy={sy} r={5} fill="#0f0f1a" stroke="#f59e0b" strokeWidth={2} />
              </g>
            );
          })}
        </g>

        {/* Legend */}
        {fns && fns.length > 1 && (
          <g>
            {fns.map((f, i) => (
              <g key={`leg${i}`}>
                <line x1={10} y1={height - 20 - i * 18} x2={26} y2={height - 20 - i * 18} stroke={f.color} strokeWidth={2} />
                {f.label && (
                  <text x={30} y={height - 16 - i * 18} fill="#c0c0d0" fontSize={12}>{f.label}</text>
                )}
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
