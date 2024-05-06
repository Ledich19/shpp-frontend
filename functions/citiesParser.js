const stringCSV = `
48.30,32.16,Кропивницький,200000,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент
#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
# в цьому файлі три рядки-коментаря :)
`;

const createObject = (city, i) => {
  return {
    position: i + 1,
    name: city[2],
    population: city[3],
  };
};

const getPopulationEnding = (population) => {
  if (population % 10 === 1 && population % 100 !== 11) {
    return "людина";
  } else if (
    population % 10 >= 2 &&
    population % 10 <= 4 &&
    (population % 100 < 10 || population % 100 >= 20)
  ) {
    return "людини";
  } else {
    return "людей";
  }
};

const createInfoString = (word, cityInfo) => {
  const ending = getPopulationEnding(cityInfo.population);
  return `${word} (${cityInfo.position} місце в містах України, населення ${cityInfo.population} ${ending})`;
};

const csvPrepareFn = (data) => {
  const rowsObject = data
    .split("\n")
    .filter((line) => !line.startsWith("#") && line.trim() !== "")
    .map((line) => line.split(","))
    .sort((a, b) => b[3] - a[3])
    .reduce((result, city, index) => {
      const cityNameKey = city[2].toLowerCase();
      result[cityNameKey] = createObject(city, index);
      return result;
    }, {});

  return (text) => {
    return text
      .split(" ")
      .map((word) => {
        const key = word.toLowerCase();
        if (key in rowsObject) return createInfoString(word, rowsObject[key]);
        return word;
      })
      .join(" ");
  };
};

const newFunction = csvPrepareFn(stringCSV);
console.log(newFunction(""));
console.log(newFunction("цікаво що таке алушта Алушта"));
console.log(
  newFunction(
    "а що на рахунок Вінниця або Джанкой який закоментованій ,а може Кропивницький ?"
  )
);
