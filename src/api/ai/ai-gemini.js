const axios = require("axios");

module.exports = function (app) {
  app.get("/ai/gemini", async (req, res) => {
    const { text, sesi } = req.query;

    if (!text || !sesi) {
      return res.status(400).json({
        status: false,
        error: "Parameter ?text= & ?sesi= wajib diisi",
        contoh: "/ai/gemini?text=hai&sesi=Alpian"
      });
    }

    try {
      const { data } = await axios.get(
        `https://izumiiiiiiii.dpdns.org/ai/gemini?text=${encodeURIComponent(text)}&sesi=${encodeURIComponent(sesi)}`
      );

      res.json({
        status: data.status,
        creator: "Alpiann",
        message: data.message || null
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: "Gagal fetch Gemini",
        detail: String(err)
      });
    }
  });
};
