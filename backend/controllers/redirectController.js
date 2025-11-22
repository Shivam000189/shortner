const Url = require('../models/Url');

module.exports = async (req, res) => {
    try {
        const shortCode = req.params.shortCode;

        const urlData = await Url.findOne({ shortCode });

        if (!urlData) {
            return res.status(404).json({ msg: "Short URL not found" });
        }

        // Increase click count
        urlData.clicks += 1;
        await urlData.save();

        // Redirect to original URL
        return res.redirect(urlData.originalUrl);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};
