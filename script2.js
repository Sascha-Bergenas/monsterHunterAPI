async function getMonsters() {
  try {
    const response = await fetch("https://mhw-db.com/monsters");
    if (!response.ok) {
      throw new Error("något gick fel");
    }
    const data = await response.json();
    const largeMonsters = data.filter((monster) => monster.type === "large");
    largeMonsters.forEach((monster) => {
      console.log(`${monster.name} — ${monster.species}`);
      if (monster.weaknesses && monster.weaknesses.length > 0) {
        monster.weaknesses.forEach((w) => {
          console.log(`${w.element} ${w.stars}★`);
        });
      } else {
        console.log("inga kända svagheter");
      }
    });
    console.log(largeMonsters);
  } catch (error) {
    console.error("fel", error);
  }
}
getMonsters();
