import Busboy from "busboy";

export function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: req.headers,
      limits: { fileSize: 8 * 1024 * 1024, files: 1 },
    });

    const fields = {};
    let fileData = null;

    busboy.on("file", (name, file, info) => {
      const chunks = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("limit", () => reject(new Error("Η φωτογραφία είναι πολύ μεγάλη (max 8MB).")));
      file.on("end", () => {
        fileData = {
          fieldName: name,
          filename: info.filename,
          mimeType: info.mimeType,
          buffer: Buffer.concat(chunks),
        };
      });
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("error", reject);
    busboy.on("finish", () => resolve({ fields, file: fileData }));
    req.pipe(busboy);
  });
}
