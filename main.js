import mongoose from "mongoose";

import "dotenv/config";
import app from "./server.js";
import NoteDao from "./dao/noteDAO.js";

async function main() {
  const PORT = process.env.PORT || 5001;

  try {
    const client = mongoose.createConnection(process.env.MONGO_URI, {
      dbName: process.env.MONGO_COLLECTION,
    });

    NoteDao.injectDB(client);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
