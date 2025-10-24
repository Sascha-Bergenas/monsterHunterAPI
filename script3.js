async function getMonsters() {
  try {
    const response = await fetch("https://mhw-db.com/monsters");

    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fel", error);
  }
}
const nameElement = document.getElementById("monsterName");
const typeElement = document.getElementById("monsterType");
const weaknessElement = document.getElementById("monsterWeaknesses");

async function showRndMonster() {
  const monsters = await getMonsters();
  if (monsters.length === 0) {
    nameElement.textContent = "Not found";
  }
  const randomIndex = Math.floor(Math.random() * monsters.length);
  const monster = monsters[randomIndex];

  const weaknesses =
    monster.weaknesses && monster.weaknesses.length > 0
      ? monster.weaknesses.map((w) => `${w.element} ${w.stars}★`).join(", ")
      : "No weknesses";

  nameElement.textContent = monster.name;
  typeElement.textContent = `Type: ${monster.type} (${monster.species})`;
  weaknessElement.textContent = `Weaknesses: ${weaknesses}`;
}
document.getElementById("btn").addEventListener("click", showRndMonster);
