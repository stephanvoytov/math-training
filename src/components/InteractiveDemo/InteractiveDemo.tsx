import { useState } from 'react';
import { GraphViewer } from '../GraphViewer/GraphViewer';
import './InteractiveDemo.css';

interface ParamDef {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

interface Props {
  title: string;
  formula: string;
  fn: (params: Record<string, number>) => (x: number) => number;
  params: ParamDef[];
  info?: (params: Record<string, number>) => string;
  additionalFns?: (params: Record<string, number>) => { fn: (x: number) => number; color: string; label?: string }[];
  xRange?: [number, number];
  yRange?: [number, number];
  width?: number;
  height?: number;
  holes?: (params: Record<string, number>) => { x: number; y: number }[];
}

export function InteractiveDemo({
  title,
  formula,
  fn,
  params: paramDefs,
  info,
  additionalFns,
  xRange = [-6, 6],
  yRange: yRangeProp,
  width = 400,
  height = 320,
  holes,
}: Props) {
  const initialParams: Record<string, number> = {};
  for (const p of paramDefs) {
    initialParams[p.key] = p.default;
  }
  const [paramValues, setParamValues] = useState<Record<string, number>>(initialParams);

  const mainFn = fn(paramValues);

  const extras = additionalFns?.(paramValues);
  const holePts = holes?.(paramValues);

  const paramArr = Object.entries(paramValues);

  return (
    <div className="interactive-demo">
      <div className="demo-header">
        <h4 className="demo-title">{title}</h4>
        <div className="demo-formula" dangerouslySetInnerHTML={{ __html: formula }} />
      </div>
      <div className="demo-body">
        <div className="demo-graph">
          <GraphViewer
            fn={mainFn}
            fns={extras}
            xRange={xRange}
            yRange={yRangeProp}
            width={width}
            height={height}
            holes={holePts}
          />
        </div>
        <div className="demo-controls">
          {paramDefs.map((p) => (
            <div key={p.key} className="demo-slider-row">
              <label className="demo-slider-label">{p.label}</label>
              <input
                type="range"
                className="demo-slider"
                min={p.min}
                max={p.max}
                step={p.step}
                value={paramValues[p.key]}
                onChange={(e) =>
                  setParamValues((prev) => ({ ...prev, [p.key]: parseFloat(e.target.value) }))
                }
              />
              <span className="demo-slider-value">{paramValues[p.key].toFixed(1)}</span>
            </div>
          ))}
          {info && (
            <div className="demo-info">{info(paramValues)}</div>
          )}
          {paramArr.length > 0 && (
            <button
              className="demo-reset"
              onClick={() => {
                const reset: Record<string, number> = {};
                for (const p of paramDefs) {
                  reset[p.key] = p.default;
                }
                setParamValues(reset);
              }}
            >
              Сбросить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
