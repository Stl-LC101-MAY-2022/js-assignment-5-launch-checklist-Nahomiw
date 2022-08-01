require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `;
}

function validateInput(testInput) {
  if (testInput === "" || testInput === null || testInput === 0) {
    return `Empty`;
  } else if (!isNaN(Number(testInput))) {
    return `Is a Number`;
  } else {
    return "Not a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let faultyItems = document.getElementById("faultyItems");
  let launchStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required!");
    return;
  } else if (
    validateInput(pilot) === "Not a Number" ||
    validateInput(copilot) === "Not a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Please enter valid information for each field!");
    return;
  } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    if (fuelLevel < 10000) {
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML = `There is not enough fuel for the journey.`;
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
    } else {
      fuelStatus.innerHTML = `Fuel level high enough for launch`;
    }
    if (cargoLevel > 10000) {
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
    } else {
      cargoStatus.innerHTML = `Cargo mass low enough for launch`;
    }
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
      launchStatus.innerHTML = `Shuttle is ready for launch`;
      launchStatus.style.color = "green";
    }
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;