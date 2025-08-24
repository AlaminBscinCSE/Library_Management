
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


async function main() {
    try {
        await mongoose.connect(config.database_url!);
        console.log("Mongoose connect successfully!");

        app.listen(config.port, () => {
            console.log(`server is running ${config.port}`);
        });
    } catch (error) {
        console.log("Error from server", error);
    }
}
main();

