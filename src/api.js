import { v4 as uuidv4 } from "uuid";

export async function loadPet() {
  // for codes see https://www.w3schools.com/charsets/ref_emoji_animals.asp
  const petCodes = [
    "&#128000;",
    "&#128004;",
    "&#128007;",
    "&#128008;",
    "&#128012;",
    "&#128022;",
    "&#128037;",
  ];
  await timeout(1000);
  // we will randomly throw an error
  const randomInt = getRandomInt(8);
  if (randomInt === 5) {
    return Promise.reject({ message: "pet not found" });
  }
  return Promise.resolve({
    id: uuidv4(),
    code: petCodes[getRandomInt(petCodes.length)],
  });
}

export const ERROR_CODE = "&#9888;&#65039;";
export const EGG_CODE = "&#129370;";

export function loadEgg() {
  return { id: uuidv4(), code: EGG_CODE };
}

export function loadError() {
  return { id: uuidv4(), code: ERROR_CODE };
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
