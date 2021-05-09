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
  return data.species.filter(({ id }) => ids.some((idOfArray) => idOfArray === id));
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

function getAnimalMap(options) {
  // seu código aqui
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
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
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
