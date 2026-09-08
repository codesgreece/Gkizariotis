const { checkPassword, createToken, json, setCors } = require("../_lib/auth");

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    if (!checkPassword(body.password)) {
      return json(res, 401, { error: "Λάθος κωδικός πρόσβασης." });
    }
    return json(res, 200, { token: createToken() });
  } catch (error) {
    console.error(error);
    return json(res, 400, { error: "Μη έγκυρο αίτημα." });
  }
};
