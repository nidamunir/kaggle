export function transform(response: any) {
  const genderObject = getGenderObject(response);
  const fbsObject = getFbsObject(response);
  const maleFbsCount = getCount(genderObject.males, "fbs");
  const femaleFbsCount = getCount(genderObject.females, "fbs");
  const highBsCpTypes = getCount(fbsObject.high, "cp");
  const lowBsCpTypes = getCount(fbsObject.low, "cp");
  const data = getTransformedData(
    maleFbsCount,
    femaleFbsCount,
    highBsCpTypes,
    lowBsCpTypes
  );
  //   console.log("Returning data,", data);
  return data;
}

function getTransformedData(
  maleFbsCount: any,
  femaleFbsCount: any,
  highBsCpTypes: any,
  lowBsCpTypes: any
) {
  return {
    nodes: [
      {
        id: "Males"
      },
      {
        id: "Females"
      },
      {
        id: "High Blood Sugar"
      },
      {
        id: "Low Blood Sugar"
      },
      {
        id: "Typical Angina"
      },
      {
        id: "Non Anginal Pain"
      },
      {
        id: "A Typical Angina"
      },
      {
        id: "Asymptomatic"
      }
    ],
    links: [
      // 1
      {
        source: "Males",
        target: "High Blood Sugar",
        value: maleFbsCount[0]
      },
      // 2
      {
        source: "Males",
        target: "Low Blood Sugar",
        value: maleFbsCount[1]
      },
      {
        source: "Females",
        target: "High Blood Sugar",
        value: femaleFbsCount[0]
      },
      {
        source: "Females",
        target: "Low Blood Sugar",
        value: femaleFbsCount[1]
      },

      {
        source: "High Blood Sugar",
        target: "Typical Angina",
        value: highBsCpTypes[0]
      },

      {
        source: "High Blood Sugar",
        target: "Non Anginal Pain",
        value: highBsCpTypes[1]
      },
      {
        source: "High Blood Sugar",
        target: "A Typical Angina",
        value: highBsCpTypes[2]
      },
      {
        source: "High Blood Sugar",
        target: "Asymptomatic",
        value: highBsCpTypes[3]
      },
      {
        source: "Low Blood Sugar",
        target: "Typical Angina",
        value: lowBsCpTypes[0]
      },
      {
        source: "Low Blood Sugar",
        target: "Non Anginal Pain",
        value: lowBsCpTypes[1]
      },
      {
        source: "Low Blood Sugar",
        target: "A Typical Angina",
        value: lowBsCpTypes[2]
      },
      {
        source: "Low Blood Sugar",
        target: "Asymptomatic",
        value: lowBsCpTypes[3]
      }
    ]
  };
}
// get count of patients for each chest pain type
function getCount(input: any, query: string) {
  var result = Object.keys(input).reduce(function(acc: any, key) {
    // for each key in the data object
    var cp: any = input[key][query];
    if (acc[cp]) acc[cp]++;
    else acc[cp] = 1;
    return acc;
  }, {});
  return result;
}
// separate according to gender
function getGenderObject(input: any) {
  if (input.length === 0) {
  }
  //   console.log("input", input);
  let males: any = [],
    females: any = [];
  input.forEach((item: any) => {
    if (item["sex"] == "1") {
      males.push(item);
    }
    if (item["sex"] == "0") {
      females.push(item);
    }
  });
  return {
    males,
    females
  };
}
// separate accordiing to high and low blood sugar, 1 = high, 0 = low high > 120mg/..
function getFbsObject(input: any) {
  let high: any = [],
    low: any = [];
  input.forEach((item: any) => {
    if (item["fbs"] == "1") {
      high.push(item);
    }
    if (item["fbs"] == "0") {
      low.push(item);
    }
  });
  return {
    high,
    low
  };
}
