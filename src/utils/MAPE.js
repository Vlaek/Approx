export function MAPE(actual, predicted) {
	let sum = 0
	for (let i = 0; i < actual.length; i++) {
		sum += Math.abs((actual[i] - predicted[i]) / actual[i])
	}
	return (sum / actual.length) * 100
}
