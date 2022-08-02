window.addEventListener("load", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      //List DOM
      let pilot = document.querySelector("input[name=pilotName]").value;
      let copilot = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoMass = document.querySelector("input[name=cargoMass]").value;
  
      //Call formSubmission
      formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
    });
  
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse;
    listedPlanetsResponse
      .then((result) => {
        listedPlanets = result;
        console.log(listedPlanets);
      })
      .then(() => {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(
          document,
          planet.name,
          planet.diameter,
          planet.star,
          planet.distance,
          planet.moons,
          planet.image
        );
      });
  });