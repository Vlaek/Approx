function count_z_i(b, c, x_arr) {
	const result = x_arr.map(x => Math.sin(b * x + c))
	return result
}

function count_a(z_arr, y_arr) {
	const sum_y_z = z_arr.reduce((sum, z, i) => sum + z * y_arr[i], 0)
	const sum_z2 = z_arr.reduce((sum, z) => sum + z ** 2, 0)
	const numerator_a =
		sum_y_z -
		(z_arr.reduce((sum, z) => sum + z, 0) *
			y_arr.reduce((sum, y) => sum + y, 0)) /
			z_arr.length
	const denominator_a =
		sum_z2 - z_arr.reduce((sum, z) => sum + z, 0) ** 2 / z_arr.length
	return numerator_a / denominator_a
}

function count_d(a, z_arr, y_arr) {
	return z_arr.reduce((sum, z, i) => sum + (y_arr[i] - a * z), 0) / z_arr.length
}

function f_mnk(a, d, z_arr, y_arr) {
	return z_arr.reduce((sum, z, i) => sum + (y_arr[i] - a * z + d) ** 2, 0)
}

function move_b(b, c, step, x_arr, y_arr, iter = 0, max_iter = 10) {
	const z_arr = count_z_i(b, c, x_arr)
	const a = count_a(z_arr, y_arr)
	const d = count_d(a, z_arr, y_arr)
	if (iter === max_iter) return [a, b, c, d]
	else {
		const f_1 = f_mnk(a, d, z_arr, y_arr)
		const b2 = b + step
		const z_arr2 = count_z_i(b2, c, x_arr)
		const a2 = count_a(z_arr2, y_arr)
		const d2 = count_d(a2, z_arr2, y_arr)
		const f_2 = f_mnk(a2, d2, z_arr2, y_arr)
		// console.log(`f2=${f_2}, f1=${f_1}`)
		if (f_2 < f_1) {
			// console.log('Шаг вперед')
			return move_b(b2, c, step, x_arr, y_arr, iter + 1)
		} else {
			const b3 = b - step
			const z_arr3 = count_z_i(b3, c, x_arr)
			const a3 = count_a(z_arr3, y_arr)
			const d3 = count_d(a3, z_arr3, y_arr)
			const f_3 = f_mnk(a3, d3, z_arr2, y_arr)
			// console.log(`f3=${f_3}, f1=${f_1}`)
			if (f_3 < f_1) {
				// console.log('Шаг назад')
				return move_b(b3, c, -step, x_arr, y_arr, iter + 1)
			} else {
				// console.log('Ничего не подходит, уменьшаем шаг')
				return move_b(b, c, step / 2, x_arr, y_arr, iter + 1)
			}
		}
	}
}

function count_y(a, b, c, d, x_arr) {
	return x_arr.map(x => a * Math.sin(b * x + c) + d)
}

export function approx(search, a, b, c, d) {
	let xArr = Array.from({ length: 100 }, (_, i) => i / 10)
	let yArr = count_y(a, b, c, d, xArr)
	let yArrPred = count_y(a, b, c, d, xArr)

	// методом научного тыка находим более менее норм значения и выписываем их
	if (!search) {
		const bStart = 0.5,
			cStart = 4.14
		const coef = move_b(bStart, cStart, 0.3, xArr, yArr)
		yArrPred = count_y(...coef, xArr)
	}

	// ищем минимальное значение
	if (search) {
		let fMin = Infinity
		let minIndex
		for (let c = 4.1; c < 4.2; c += 0.001) {
			for (let b = 0.4; b < 0.6; b += 0.001) {
				const zArr = count_z_i(b, c, xArr)
				const a = count_a(zArr, yArr)
				const d = count_d(a, zArr, yArr)
				const mnk = f_mnk(a, d, zArr, yArr)

				if (mnk < fMin) {
					fMin = mnk
					minIndex = [a, b, c, d]
				}
			}
		}

		yArrPred = count_y(...minIndex, xArr)
	}

	return [xArr, yArr, yArrPred]
}
