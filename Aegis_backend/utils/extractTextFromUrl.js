const axios = require("axios");
const { JSDOM } = require("jsdom");

async function extractTextFromUrl(url) {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const text = dom.window.document.body.textContent || "";
    return text.trim();
  } catch (error) {
    console.error("❌ Error extracting text from URL:", error.message);
    return ""; // Or throw the error if you want the route to handle it differently
  }
}

module.exports = extractTextFromUrl;