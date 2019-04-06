export function transform2(response: any) {
	response = editGender(response, '1', 'male', 'sex');
	response = editGender(response, '0', 'female', 'sex');
	response = editGender(response, '0', 'high', 'fbs');
	response = editGender(response, '1', 'low', 'fbs');
	const genderValues = uniqueValuesOfColumn(response, 'sex');
	const bloodSugarValues = uniqueValuesOfColumn(response, 'fbs');
	const chestPainValues = uniqueValuesOfColumn(response, 'cp');
	const nodeValues = [ ...genderValues.values, ...bloodSugarValues.values ];
	const nodes = calculateNodes(nodeValues);
	// console.log('Nodes: ', [ ...genderValues, ...bloodSugarValues, ...chestPainValues ]);
	// const g = { values: [ '1', '0' ], key: 'sex' };
	// const f = { values: [ '0', '1' ], key: 'fbs' };
	// console.log(genderValues);
	const links1 = calculateLinks(genderValues, bloodSugarValues, response);
	const links2 = calculateLinks(bloodSugarValues, chestPainValues, response);
	const data = {
		nodes,
		links: [ ...links1 ]
	};
	// console.log('data', data);
	// console.log(response);
	return data;
}

function editGender(array: any, oldName: any, name: any, key: string) {
	return array.map((item: any) => {
		var temp = Object.assign({}, item);
		if (temp[key] === oldName) {
			temp[key] = name;
		}
		return temp;
	});
}

function uniqueValuesOfColumn(input: any, query: string) {
	const genderValues: any = { key: query, values: [] };
	const values = input
		.map((item: any) => item[query])
		.filter((value: any, index: any, self: any) => self.indexOf(value) === index);
	genderValues.values = values;
	return genderValues;
}

function calculateLinks(src: any, tar: any, response: any) {
	const links: any = [];
	src.values.map((s: any) => {
		tar.values.map((t: any) => {
			links.push({
				source: s,
				target: t,
				value: response.filter((res: any) => {
					return res[src.key] == s && res[tar.key] == t;
				}).length
			});
		});
	});
	return links;
	// console.log('Links', links);
}
function calculateNodes(values: any) {
	const nodes: any = [];
	values.map((v: any) => nodes.push({ id: v }));
	// console.log('nodes', nodes);
	return nodes;
}
