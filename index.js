const fs = require("fs");
const { writeFile } = require("fs/promises");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

const readNotes = async () => {
  try {
    const data = await readFileAsync("notes.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.error(`Internal Server Error: ${error.message}`);
  }
};

const createNotes = async (fileName, data) => {
  try {
    await writeFileSync(fileName, data);
    console.log(`File '${fileName}' created successfully.`);
  } catch (error) {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
};

// readNotes();

// createNotes("note1.txt", "This is the content of the new file.");
