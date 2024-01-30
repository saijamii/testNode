const fs = require("fs");
fs.readFile("notes.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
