const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

async function readNotes() {
  try {
    const data = await readFileAsync("notes.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.error(`Internal Server Error: ${error.message}`);
  }
}

readNotes();
