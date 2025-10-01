const axios = require("axios");

module.exports = function (app) {
  app.get("/ai/deepseek", async (req, res) => {
    const { messages } = req.query;

    if (!messages) {
      return res.status(400).json({
        status: false,
        error: "Parameter ?messages= wajib diisi",
        contoh: "/ai/deepseek?messages=hai"
      });
    }

    try {
      const { data } = await axios.get(
        `https://izumiiiiiiii.dpdns.org/ai/deepseek?messages=${encodeURIComponent(messages)}`
      );

      res.json({
        status: data.status,
        creator: "Alpiann",
        message: data.message || null
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: "Gagal fetch DeepSeek",
        detail: String(err)
      });
    }
  });
};
