/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/
// Mudança para commit

const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  return data.species.filter((species) => ids.some((idOfArray) => idOfArray === species.id));
}

// animal, age
function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  return (data.species.find((specie) => specie.name === animal)).residents.every((animalName) => animalName.age > age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

// Cria um novo colaborador a partir de objetos contendo informações pessoais e gerentes e animais gerenciados.
function isManager(id = false) {
  // seu código aqui
  return data.employees.some((employeeInfo) => employeeInfo.managers.some((idCheck) => idCheck === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    let object = {};
    data.species.forEach((animal) => {
      object[animal.name] = animal.residents.length;
    });
    return object;
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  // seu código aqui
  let total = 0;
  if (!entrants) {
    return total;
  }
  if (entrants.Adult !== undefined) {
    total += entrants.Adult * data.prices.Adult;
  }
  if (entrants.Child !== undefined) {
    total += entrants.Child * data.prices.Child;
  }
  if (entrants.Senior !== undefined) {
    total += entrants.Senior * data.prices.Senior;
  }
  return total;
}

// function createLocation() {
//   let object = {};
//   let regions = ['NE', 'NW', 'SE', 'SW'];
//   regions.forEach((region) => {
//     object[region] = (data.species.filter((specie) => specie.location === region)).map((specie) => specie.name);
//   });
//   return object;
// }
// REFATORANDO

function createLocation() {
  const object = {};
  data.species.forEach((specie) => {
    if (!object[specie.location]) {
      object[specie.location] = [];
    }
    object[specie.location].push(specie.name);
  });
  return object;
}

function createAnimalNames(sorted, sex) {
  let regions = { NE: [], NW: [], SE: [], SW: [] };
  data.species.forEach((specie) => {
    let animalNames;
    if (sex) {
      animalNames = specie.residents.filter((animal) => animal.sex === sex).map(({ name }) => name);
    } else {
      animalNames = specie.residents.map(({ name }) => name);
    }
    if (sorted) {
      animalNames.sort();
    }
    regions[specie.location].push({ [specie.name]: animalNames });
  });
  return regions;
}

function getAnimalMap(options = {}) {
  const { includeNames, sorted, sex } = options;
  let object = {};
  if (includeNames) {
    object = createAnimalNames(sorted, sex);
  } else {
    object = createLocation();
  }
  return object;
}

function insertOpenDays(object) {
  for (let days in data.hours) {
    if (days !== 'Monday') {
      object[days] = `Open from ${data.hours[days].open}am until ${data.hours[days].close - 12}pm`;
    }
  }
}

function getSchedule(dayName) {
  // seu código aqui
  let days = {};
  if (!dayName) {
    insertOpenDays(days);
    days.Monday = 'CLOSED';
    return days;
  }
  if (dayName !== 'Monday') {
    days[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return days;
  }
  days.Monday = 'CLOSED';
  return days;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeSelected = data.employees.find((employee) => employee.id === id);
  const firstAnimal = employeeSelected.responsibleFor[0];
  const oldestAnimal = data.species.find((animal) => animal.id === firstAnimal).residents.reduce((acc, current) => (current.age > acc.age ? current : acc));
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage = 0) {
  // seu código aqui
  data.prices = {
    Adult: Math.round((
      data.prices.Adult * (1 + (percentage / 100))) * 100) / 100,
    Senior: Math.round((data.prices.Senior * (1 + (percentage / 100))) * 100) / 100,
    Child: Math.round((data.prices.Child * (1 + (percentage / 100))) * 100) / 100,
  };
  return data.prices;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) {
    let object = {};
    data.employees.forEach((employee) => {
      object[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((id) => data.species.find((species) => species.id === id).name);
    });
    return object;
  }
  let object = {};
  let employeeInfo = data.employees.find((employee) => employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName);
  object[`${employeeInfo.firstName} ${employeeInfo.lastName}`] = employeeInfo.responsibleFor.map((id) => data.species.find((species) => species.id === id).name);
  return object;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
