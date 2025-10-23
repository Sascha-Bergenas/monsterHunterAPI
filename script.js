function getMonsters() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  fetch("https://mhw-db.com/monsters", config)
    .then((response) => response.json())
    .then((data) => {
      const largeMonsters = data.filter((monster) => monster.type === "large");
      console.log(largeMonsters);
    })
    .catch((error) => console.error("fel vid hämtning, error"));
}
getMonsters();
