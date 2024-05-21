import app from "./app";
import mongoose from "mongoose";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.url as string);
    } catch (error) {
        console.log(error);
    }
}
app.listen(config.port, () => {
    console.log(`Database connected & app is listening on port ${config.port}`)
})

main();