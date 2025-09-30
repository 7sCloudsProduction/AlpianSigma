const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");

async function facebookScraper(url) {
  try {
    const payload = qs.stringify({ fb_url: url });

    const res = await axios.post("https://saveas.co/smart_download.php", payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 30000
    });

    const $ = cheerio.load(res.data);

    const thumb = $(".box img").attr("src") || null;
    const title = $(".box .info h2").text().trim() || null;
    const desc = $(".box .info p").first().text().replace("Description:", "").trim() || null;
    const duration = $(".box .info p").last().text().replace("Duration:", "").trim() || null;
    const sd = $("#sdLink").attr("href") || null;
    const hd = $("#hdLink").attr("href") || null;

    return {
      status: true,
      result: { title, desc, duration, thumb, sd, hd }
    };
  } catch (e) {
    return { status: false, error: e.message };
  }
}

module.exports = function(app) {
  app.get("/download/facebook", async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({
        status: false,
        error: "Parameter ?url= wajib diisi",
        contoh: "/download/facebook?url=https://www.facebook.com/share/r/1GTqMMyUm4/"
      });
    }

    try {
      const result = await facebookScraper(url);
      res.json(result);
    } catch (err) {
      res.status(500).json({ status: false, error: String(err) });
    }
  });
};