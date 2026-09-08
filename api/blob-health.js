const { list } = require("@vercel/blob");

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
    const result = await list({
      limit: 1,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        ok: true,
        hasToken,
        count: result.blobs.length,
      }),
    );
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        ok: false,
        hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
        error: error?.message || String(error),
        name: error?.name,
      }),
    );
  }
};
