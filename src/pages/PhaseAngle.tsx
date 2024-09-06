import React, { useState } from 'react';
import ACWaveDiagram from '../components/ACwave';
import PowerFactorTriangle from '../components/PowerTriangle';

const PhaseAngle = () => {
  const [voltage, setVoltage] = useState(240);
  const [current, setCurrent] = useState(50);
  const [phase, setPhase] = useState(0);

  const Pavg = (voltage * current) * Math.cos(phase * Math.PI / 180);

  const handlePhaseChange = (value: number) => {
    const snapPoints = [0,30, 60, 90, 120, 180, 270, 360];
    const closestSnapPoint = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );

    if (Math.abs(value - closestSnapPoint) < 10) {
      setPhase(closestSnapPoint);
    } else {
      setPhase(value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'top' }}>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '10px' }}>
        <div>
          <label>
            Voltage (line-to-neutral):
            <input
              type="range"
              min="0"
              max="240"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
            />
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
          <button onClick={() => setVoltage(0)} style={{ marginLeft: '10px' }}>Zero</button>
        </div>
        <div>
          <label>
            Current:
            <input
              type="range"
              min="-100"
              max="100"
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
            />
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
          <button onClick={() => setCurrent(0)} style={{ marginLeft: '10px' }}>Zero</button>
        </div>
        <div>
          <label>
            Phase Angle:
            <input
              type="range"
              min="-360"
              max="360"
              value={phase}
              onChange={(e) => setPhase(Number(e.target.value))}
            />
            <input
              type="number"
              value={phase}
              onChange={(e) => setPhase(Number(e.target.value))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
          <button onClick={() => setPhase(0)} style={{ marginLeft: '10px' }}>Zero</button>
        </div>
        <div>
          <label>
            Real Power (P): {Pavg.toFixed(0)} W
          </label>
        </div>
      </div>
      <div>
        <ACWaveDiagram
          CurrentAmplitude={current / 2}
          VoltageAmplitude={voltage / 2}
          phaseDifference={(Math.PI / 180) * phase}
          showPower={true}
        />
      </div>
    </div>
  );
};

export default PhaseAngle;
