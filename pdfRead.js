const fs = require("fs");
const pdf = require("pdf-parse");

// Function to read and parse the PDF
async function readPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  try {
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
}

// Function to search for keywords in the text
function searchKeywords(text, keywords) {
  const results = {};
  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword, "gi");
    const matches = text.match(regex);
    results[keyword] = matches ? matches.length : 0;
  });
  return results;
}

// Main function
async function main() {
  const filePath = "./resume-sample.pdf";
  const keywords = ["Sales Person", "Job Name","Address","SALES ORDER"];

  const text = await readPDF(filePath);
  console.log(text)
  if (text) {
    const keywordResults = searchKeywords(text, keywords);
    console.log("Keyword Search Results:", keywordResults);
  }
}

main();
