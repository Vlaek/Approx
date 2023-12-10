import { useState } from 'react'
import Plot from 'react-plotly.js'
import { approx } from './utils/approx'
import { MAPE } from './utils/MAPE'

export default function App() {
	const [coord, setCoord] = useState({
		a: 0.1,
		b: 0.5,
		c: 1,
		d: 2,
	})

	const search = false

	const [xArr, yArr, yArrPred] = approx(
		search,
		coord.a,
		coord.b,
		coord.c,
		coord.d,
	)

	let xArrPred = []
	for (let i = 0; i <= 50.1; i += 0.1) {
		xArrPred.push(i)
	}

	const mape = MAPE(yArr, yArrPred)

	return (
		<div className='wrapper'>
			<div className='content'>
				<div className='plot'>
					<h1>y = a * sin(bx + c) + d</h1>
					<Plot
						data={[
							{
								x: xArr,
								y: yArr,
								type: 'scatter',
								mode: 'lines',
								line: { shape: 'spline', smoothing: 1.3 },
								marker: { color: 'red' },
								name: 'y',
							},
							{
								x: xArrPred,
								y: yArrPred,
								type: 'scatter',
								mode: 'lines',
								line: { shape: 'spline', smoothing: 1.3 },
								marker: { color: 'blue' },
								name: 'y pred',
							},
						]}
						layout={{
							width: 800,
							height: 600,
						}}
					/>
				</div>
				<div className='settings'>
					<div className='mape'>MAPE = {mape.toFixed(4)}</div>
					<div className='item'>
						<div className='label'>a = </div>
						<input
							type='number'
							value={coord.a}
							onChange={e =>
								setCoord(prev => ({ ...prev, a: +e.target.value }))
							}
						/>
					</div>
					<div className='item'>
						<div className='label'>b = </div>
						<input
							type='number'
							value={coord.b}
							onChange={e =>
								setCoord(prev => ({ ...prev, b: +e.target.value }))
							}
						/>
					</div>
					<div className='item'>
						<div className='label'>c = </div>
						<input
							type='number'
							value={coord.c}
							onChange={e =>
								setCoord(prev => ({ ...prev, c: +e.target.value }))
							}
						/>
					</div>
					<div className='item'>
						<div className='label'>d = </div>
						<input
							type='number'
							value={coord.d}
							onChange={e =>
								setCoord(prev => ({ ...prev, d: +e.target.value }))
							}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
