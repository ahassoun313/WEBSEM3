// legoSets.js

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id)?.name || "Unknown Theme";

        return {
          ...set,
          theme,
        };
      });

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
}

function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject(`Unable to find set with set_num: ${setNum}`);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const matchingSets = sets.filter(
      (set) => set.theme.toLowerCase().includes(theme.toLowerCase())
    );

    if (matchingSets.length > 0) {
      resolve(matchingSets);
    } else {
      reject(`Unable to find sets with theme: ${theme}`);
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };



// Testing at the bottom of legoSets.js
async function testLegoSets() {
    try {
      await initialize();
      const allSets = await getAllSets();
      console.log("All Sets:", allSets);
  
      const specificSet = await getSetByNum("001-1");
      console.log("Specific Set:", specificSet);
  
      const setsByTheme = await getSetsByTheme("tech");
      console.log("Sets by Theme:", setsByTheme);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  testLegoSets();
  