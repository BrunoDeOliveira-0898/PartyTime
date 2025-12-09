const mongoose = require("mongoose");
async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://brunoo043:Koshino%40765@cluster0.z61wq6h.mongodb.net/?appName=Cluster0"
    );
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.log("Erro! ", error);
  }
}

module.exports = main;
