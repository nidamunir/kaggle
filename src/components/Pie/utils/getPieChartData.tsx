export function transform(response: any, query = "cp") {
  const groupedData = getCount(response, query);
  if (query == "fbs") return getBloodSugarData(groupedData);
  if (query == "cp") return getChestPainData(groupedData);
  if (query == "thalach") return getHeartRateData(groupedData);
  if (query == "exang") return getExerciseData(groupedData);
  if (query == "oldpeak") return getOldPeakData(groupedData);

  if (query == "ca") return getMajorVesselsData(groupedData);
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

function getChestPainData(groupedData: any) {
  const data: any = [];
  let cpType = "";
  Object.keys(groupedData).forEach(key => {
    if (key == "0") {
      cpType = "typical angina";
    }
    if (key == "1") {
      cpType = "atypical angina";
    }
    if (key == "2") {
      cpType = "non-anginal pain";
    }
    if (key == "3") {
      cpType = "asymptomatic";
    }
    const temp = {
      id: cpType,
      label: cpType,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}

function getBloodSugarData(groupedData: any) {
  const data: any = [];
  let bsType = "";
  Object.keys(groupedData).forEach(key => {
    if (key == "1") {
      bsType = "High blood sugar";
    }
    if (key == "0") {
      bsType = "Low blood sugar";
    }

    const temp = {
      id: bsType,
      label: bsType,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}

function getExerciseData(groupedData: any) {
  const data: any = [];
  let bsType = "";
  Object.keys(groupedData).forEach(key => {
    if (key == "1") {
      bsType = "Yes";
    }
    if (key == "0") {
      bsType = "No";
    }

    const temp = {
      id: bsType,
      label: bsType,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}

function getHeartRateData(groupedData: any) {
  const data: any = [];
  let bsType = "";
  Object.keys(groupedData).forEach(key => {
    const temp = {
      id: key,
      label: key,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}

function getOldPeakData(groupedData: any) {
  const data: any = [];
  let bsType = "";
  Object.keys(groupedData).forEach(key => {
    const temp = {
      id: key,
      label: key,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}

function getMajorVesselsData(groupedData: any) {
  const data: any = [];
  let bsType = "";
  Object.keys(groupedData).forEach(key => {
    const temp = {
      id: key,
      label: key,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}
