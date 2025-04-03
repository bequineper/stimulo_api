import knex from "knex";
import express from "express";
import router from "./router.js"
import 'dotenv/config';

const app = express();
const port = 3000;
export let table1 = "user";
export let table2 = "package";
export let table3 = "file";
export let table4 = "file_has_package";

app.use(express.json());
app.use(router);



app.get("/", (req, res) => {
  res.status(200).send("Initial page");
});

app.listen(port, () => {
  console.log(`Server on port: ${ port}`);
});