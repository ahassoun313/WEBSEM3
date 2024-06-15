/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ali Hassoun   Student ID: 103519237 Date: 6/14/2024
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const express = require("express");
const legoData = require("./modules/legoSets");
const themeData = require("./data/themeData");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

//Lego set by number
app.get("/lego/sets/:setNum", (req, res) => {
  const setNum = req.params.setNum;
  legoData
    .getSetByNum(setNum)
    .then((set) => {
      res.json(set);
    })
    .catch((error) => {
      res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    });
});

// Filter by theme or return all sets if no theme is provided
app.get("/lego/sets", async (req, res) => {
  try {
    const theme = req.query.theme;
    let sets;

    if (theme) {
      sets = await legoData.getSetsByTheme(theme);
    } else {
      sets = await legoData.getAllSets();
    }

    if (sets.length > 0) {
      res.json(sets);
    } else {
      res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
  } catch (error) {
    console.error(error);
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  }
});

 
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
