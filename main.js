const { Client } = require("pg");
const express = require("express");
const morgan = require("morgan"); // Some nice logging

/**
 * Følgende parametre bruges til at forbinde til databasen.
 * PORT er den port som webserveren her kører på.
 * DB_USER er brugernavnet til databasen.
 * DB_HOST er serveren som databasen kører på. Enten localhost eller en anden server.
 * DB_NAME er det navn som databasen har.
 * DB_PW er password til DB_USER.
 * DB_PORT er porten til databasen. Det plejer at være 5432, så den behøver man nok ikke ændre.
 */
const PORT = process.env.PORT || 8080;

const DB_USER = process.env.DB_USER || "ywiducgq";
const DB_HOST = process.env.DB_HOST || "tai.db.elephantsql.com";
const DB_NAME = process.env.DB_NAME || "ywiducgq";
const DB_PW = process.env.DB_PW || "qs6-0cTm6mMnYBG6SeTUgTd6LX5upN7i";
const DB_PORT = process.env.DB_PORT || 5432;

/**
 * I stedet for at ændre på DB-værdierne i koden herover, er det bedre at gøre det som
 * en del af den måde man kører programmet på. Hver DB-værdi kan sættes i terminalen
 * inden man kører programmet. Det gør man sådan her:
 * 
 * $ export DB_NAME="kristians-database"
 * 
 * Nu er DB_NAME sat til "kristians-database" når programmet kører, uden at man har
 * ændret i JavaScript-koden. Dette skal gøres hver gang du åbner en ny terminal.
 * Det skal helst gøres både for DB_NAME, DB_PW, DB_USER og DB_HOST.
 * PORT og DB_PORT plejer man ikke at ændre.
 */
if (!process.env.DB_NAME || !process.env.DB_PW || !process.env.DB_USER) {
  console.warn("Husk at sætte databasenavn, password og user via env vars.");
  console.warn("Eksempel på at sætte databasenavn i terminalen:");
  console.warn(`export DB_NAME="kristians-database"`);
  console.warn("Lige nu er databasenavn sat til:", DB_NAME);
} else {
  console.log("Postgres database:", DB_NAME);
  console.log("Postgres user:", DB_USER);
}

/*
 * Herunder laves web-serveren. Den indeholder din html (fra public-folderen)
 * og API'en så der er forbindelse videre til databasen fra JavaScript. Det er "to i en".
 */
const app = express();
const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PW,
  port: DB_PORT
});
client.connect();

app.use(express.text());
app.use(express.static("public"))
app.use(morgan("combined"));
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');




app.get('/api/seasonalFruit/:id', async function (req, res) {
  try {
    // Lav query
    let month = req.params.id;
    const query = `SELECT "Groentsag", "Kommentar" FROM public."seasonalVegatabels" where "${month}" iLIKE '%x%'`;
    queryData = await client.query(query);
    // Giv svar tilbage til JavaScript
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    // Hvis query fejler, fanges det her.
    // Send fejlbesked tilbage til JavaScript
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})



app.post("/api/frugt/getall", async (req, res) => {
  try {
    // Lav query
    const query1 = 'SELECT grøntsag FROM public.co2indud';

    queryData = await client.query(query1);
    // Giv svar tilbage til JavaScript
    res.json({
      "ok": true,
      "data": queryData.rows,

    })
  } catch (error) {
    // Hvis query fejler, fanges det her.
    // Send fejlbesked tilbage til JavaScript
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})


app.post("/api/frugt/getco2indud", async (req, res) => {
  try {
    // Lav query
    const query1 = `SELECT "grøntsag", ind, ud FROM public.co2indud;`;
    queryData = await client.query(query1);
    // Giv svar tilbage til JavaScript
    res.json({
      "ok": true,
      "data": queryData.rows,
    })
  } catch (error) {
    // Hvis query fejler, fanges det her.
    // Send fejlbesked tilbage til JavaScript
    res.json({
      "ok": false,
      "message": error.message,
    })
  }
})






// Web-serveren startes.
app.listen(PORT, () => console.log(`Serveren kører på http://localhost:${PORT}`));

