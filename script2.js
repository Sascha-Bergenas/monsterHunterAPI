const nameElement = document.getElementById("monsterName");
const typeElement = document.getElementById("monsterType");
const weaknessElement = document.getElementById("monsterWeakness");
const elderDragons = document.getElementById("btnElder");
const FlyingWyvern = document.getElementById("btnFlying");
const fangedWyvern = document.getElementById("btnFanged");
const piscineWyvern = document.getElementById("btnPiscine");
const birdWyvern = document.getElementById("btnbird");
const bruteWyvern = document.getElementById("btnBrute");
const fangedBeast = document.getElementById("btnBeast");
const allMonsters = document.getElementById("btn");

async function getMonsters() {
  try {
    const response = await fetch("https://mhw-db.com/monsters");

    if (!response.ok) {
      throw new Error("något gick fel");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fel", error);
  }
}

async function renderMonsterData() {
  const monsters = await getMonsters();

  nameElement.textContent = monsters.name;
  typeElement.textContent = monsters.type;
  weaknessElement.textContent = monsters.weaknesses;

  const largeMonsters = monsters.filter((m) => m.type === "large");
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
  const elderDragons = monsters.filter((m) => m.species === "elder dragon");

  if (elderDragons.length > 0) {
    elderDragons.forEach((monster) => {
      const weaknesses =
        monster.weaknesses && monster.weaknesses.length > 0
          ? monster.weaknesses.map((w) => `${w.element} ${w.stars}★`).join(", ")
          : "inga svagheter";
    });
  }

  elderDragons.forEach((monster) => {});
}
document
  .getElementById("btnElder")
  .addEventListener("click", renderMonsterData);
