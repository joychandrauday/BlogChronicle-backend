import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB successfully!");
    app.listen(config.port, () => {
      console.log(`BlogChronicle app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if the database connection fails
  }
}

main();
export default app;
