const { default: axios } = require("axios");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const NewsSchema = new mongoose.Schema({
  status: String,
  totalResults: Number,
  articles: [
    {
      source: {
        id: String,
        name: String,
      },
      author: String,
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      publishedAt: Date,
      content: String,
    },
  ],
});

const getDefualtNews = async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=c389c9dc61d748c98a41ab2461ad1b36"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Product API" });
  }
};

const getNewsBySearch = async (req, res) => {
  const { q, from, sortBy } = req.query;

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=Prisoner Swaps&from=2024-08-01&sortBy=popularity&apiKey=c389c9dc61d748c98a41ab2461ad1b36"
      // {
      //   params: {
      //     q: q || "politics", // default to 'bitcoin' if q is not provided
      //     from: from || "2024-07-01", // default to '2024-08-01' if from is not provided
      //     sortBy: sortBy || "popularity", // default to 'popularity' if sortBy is not provided
      //     apiKey: "0d6ca64f4de64f0a83cf4ee85d24aafc",
      //   },
      // }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Product API" });
  }
};

const getBreakingNewsHeadlines = async (req, res) => {
  const { country } = req.query;

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: country || "us",
        apiKey: "c389c9dc61d748c98a41ab2461ad1b36",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Product API" });
  }
};

module.exports = {
  getDefualtNews,
  getNewsBySearch,
  getBreakingNewsHeadlines,
};
