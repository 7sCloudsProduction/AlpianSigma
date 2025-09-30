const axios = require("axios");

module.exports = function (app) {
  app.get("/tools/qrtext", async (req, res) => {
    const { text, type } = req.query;

    if (!text) {
      return res.status(400).json({
        status: false,
        error: "Parameter ?text= wajib diisi",
        contoh: "/tools/qrtext?text=https://wa.me/6287781287196&type=image"
      });
    }

    try {
      const { data } = await axios.get(
        `https://api.rullzfuqione.xyz/api/tools/qrtext/?text=${encodeURIComponent(text)}`
      );

      if (!data.success) {
        return res.status(500).json({ status: false, error: "Gagal generate QR" });
      }

    
      if (type === "image") {
        const base64 = data.data.qr_code.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64, "base64");

        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": buffer.length
        });
        return res.end(buffer);
      }

      
      res.json({
        status: true,
        result: {
          text: data.data.text,
          size: data.data.size,
          author: "Alpiann",
          format: data.data.format,
          qr: data.data.qr_code
        }
      });
    } catch (err) {
      res.status(500).json({ status: false, error: String(err) });
    }
  });
};
