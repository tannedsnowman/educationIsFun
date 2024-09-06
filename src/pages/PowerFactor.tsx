import React, { useState } from 'react'
import ACWaveDiagram from '../components/ACwave'
import PowerFactorTriangle from '../components/PowerTriangle'

const PowerFactor = () => {
  const [Pload, setPload] = useState(100)
  const [Qload, setQload] = useState(50)

  // Recalculate S whenever P or Q changes
  const Sload = Math.sqrt(Math.pow(Pload, 2) + Math.pow(Qload, 2))

  const [Ppv, setPpv] = useState(50)
  const [Qpv, setQpv] = useState(0)

  // Recalculate S whenever P or Q changes
  const Spv = Math.sqrt(Math.pow(Ppv, 2) + Math.pow(Qpv, 2))

  const Pgrid = +Ppv - Pload
  const Qgrid = +Qpv - Qload
  const Sgrid = Math.sqrt(Math.pow(Pgrid, 2) + Math.pow(Qgrid, 2))
  const pf = Pgrid / Sgrid
  const phase = Math.acos(pf)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'top',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '0px',
        }}
      >
        <div>
          <div>
            <label>
              Pload:
              <input
                type="range"
                min="0"
                max="200"
                value={Pload}
                onChange={(e) => setPload(Number(e.target.value))}
              />
              {Pload}
            </label>
            <button
              style={{
                marginLeft: '10px',
                padding: '2px 5px',
                cursor: 'pointer',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                border: '1px solid black',
              }}
              onClick={() => {
                setPload(100)
              }}
            >
              Middle
            </button>
          </div>

          <div>
            <label>
              Qload:
              <input
                type="range"
                min="-100"
                max="100"
                value={Qload}
                onChange={(e) => setQload(Number(e.target.value))}
              />
              {Qload}
            </label>
            <button
              style={{
                marginLeft: '10px',
                padding: '2px 5px',
                cursor: 'pointer',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                border: '1px solid black',
              }}
              onClick={() => {
                setQload(0)
              }}
            >
              Zero
            </button>
          </div>
        </div>
        <div>
          <div>
            <label>
              Ppv:
              <input
                type="range"
                min="0"
                max="200"
                value={Ppv}
                onChange={(e) => setPpv(Number(e.target.value))}
              />
              {Ppv}
            </label>
            <button
              style={{
                marginLeft: '10px',
                padding: '2px 5px',
                cursor: 'pointer',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                border: '1px solid black',
              }}
              onClick={() => {
                setPpv(100)
              }}
            >
              Middle
            </button>
          </div>

          <div>
            <label>
              Qpv:
              <input
                type="range"
                min="-100"
                max="100"
                value={Qpv}
                onChange={(e) => setQpv(Number(e.target.value))}
              />
              {Qpv}
            </label>
            <button
              style={{
                marginLeft: '10px',
                padding: '2px 5px',
                cursor: 'pointer',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                border: '1px solid black',
              }}
              onClick={() => {
                setQpv(0)
              }}
            >
              Zero
            </button>
          </div>
        </div>
        <div>
          <div>
            <label>
              Powerfactor (cosφ):
              {pf.toFixed(2)}
            </label>
          </div>
          <div>
            <label>
              Angle (φ):
              {phase.toFixed(2)}
            </label>
          </div>
          <div>
            <label>
              Pgrid:
              {Pgrid}W
            </label>
          </div>
          <div>
            <label>
              Qgrid:
              {Qgrid}VAr
            </label>
          </div>
          <div>
            <label>
              Sgrid:
              {Sgrid.toFixed(0)}VA
            </label>
          </div>
        </div>
      </div>

      <div>
        <PowerFactorTriangle P={-Pload} Q={-Qload} S={Sload} label="load" />
        <PowerFactorTriangle P={Ppv} Q={Qpv} S={Spv} label="pv" />
        <PowerFactorTriangle P={Pgrid} Q={Qgrid} S={Sgrid} label="grid" />
      </div>
      <div>
        <ACWaveDiagram
          CurrentAmplitude={Sload / 5}
          VoltageAmplitude={240 / 5}
          phaseDifference={Math.acos(Pload / Sload)}
          height={300}
        />
        <ACWaveDiagram
          CurrentAmplitude={Spv / 5}
          VoltageAmplitude={240 / 5}
          phaseDifference={Math.acos(Ppv / Spv)}
          height={300}
        />
        <ACWaveDiagram
          CurrentAmplitude={Sgrid / 5}
          VoltageAmplitude={240 / 5}
          phaseDifference={Math.acos(Pgrid / Sgrid)}
          height={300}
        />
      </div>
    </div>
  )
}

export default PowerFactor
