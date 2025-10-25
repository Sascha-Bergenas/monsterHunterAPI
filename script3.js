const nameElement = document.getElementById("monsterName");
const typeElement = document.getElementById("monsterType");
const weaknessElement = document.getElementById("monsterWeaknesses");
const resistancesElement = document.getElementById("monsterResistances");
const typeHeading = document.getElementById("typeHeading");
const weaknessesHeading = document.getElementById("weaknessesHeading");
const resistancesHeading = document.getElementById("resistancesHeading");

const displayLoading = () => {
  nameElement.textContent = "Loading...";
};

const resetNameElement = () => {
  nameElement.textContent = "";
};

const clearMonsterInformation = () => {
  typeElement.textContent = "";
  weaknessesHeading.textContent = "";
  weaknessElement.textContent = "";
  resistancesHeading.textContent = "";
  resistancesElement.textContent = "";
  typeHeading.textContent = "";
};

const displayWeaknesses = (monster) => {
  const weaknesses =
    monster.weaknesses && monster.weaknesses.length > 0
      ? monster.weaknesses.map((w) => `${w.element} ${w.stars}★`).join(", ")
      : "No weknesses";

  weaknessesHeading.textContent = "Weaknesses:";
  weaknessElement.textContent = `${weaknesses}`;
};

const displayResistances = (monster) => {
  const resistances =
    monster.resistances && monster.resistances.length > 0
      ? monster.resistances.map((res) => `${res.element}`).join(", ")
      : "No resistances";

  resistancesHeading.textContent = `Resistances:`;
  resistancesElement.textContent = `${resistances}`;
};

async function getMonsters() {
  try {
    displayLoading();
    clearMonsterInformation();
    const response = await fetch("https://mhw-db.com/monsters");

    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fel", error);
  } finally {
    resetNameElement();
  }
}

async function showRandomMonster() {
  const allMonsters = await getMonsters();
  if (allMonsters.length === 0) {
    nameElement.textContent = "Not found";
  }
  const randomIndex = Math.floor(Math.random() * allMonsters.length);
  const monster = allMonsters[randomIndex];
  console.log(monster);
  displayWeaknesses(monster);
  displayResistances(monster);

  nameElement.textContent = monster.name;
  typeHeading.textContent = "Type:";
  typeElement.textContent = ` ${monster.type} (${monster.species})`;
}
document.getElementById("btn").addEventListener("click", showRandomMonster);
