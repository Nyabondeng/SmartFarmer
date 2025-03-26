const mongoose = require("mongoose");
const Content = require("./models/content");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/smartfarmer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

async function insertContent() {
  const topics = [
    {
      title: "Soil Health",
      category: "Agriculture Practices",
      description: "Soil health is the ability of soil to function as a living ecosystem that sustains plants, animals, and humans.",
      content: "Soil health is critical for sustainable agriculture. Practices such as crop rotation, composting, and reducing tillage help improve soil fertility, structure, and biodiversity."
    },
    {
      title: "Irrigation Techniques",
      category: "Water Management",
      description: "Irrigation techniques are methods of supplying water to crops and plants at the right time and in the right amount.",
      content: "Effective irrigation techniques such as drip irrigation, sprinkler systems, and rainwater harvesting help conserve water while ensuring optimal crop growth."
    },
    {
      title: "Pest Control",
      category: "Crop Protection",
      description: "Pest control involves managing the population of pests that harm crops.",
      content: "Integrated pest management (IPM) combines biological, cultural, and chemical practices to control pest populations while minimizing environmental impact."
    },
    {
      title: "Water Conservation and Rainwater Harvesting",
      category: "Water Management",
      description: "Water conservation and rainwater harvesting techniques help ensure water availability for agricultural practices.",
      content: "By collecting and storing rainwater, farmers can reduce reliance on traditional water sources, ensuring water is available during dry periods."
    },
    {
      title: "Organic Pest Control",
      category: "Crop Protection",
      description: "Organic pest control focuses on natural ways to manage pests without using synthetic chemicals.",
      content: "Natural predators, organic pesticides, and crop companion planting are key methods in organic pest control, reducing the impact on the environment."
    },
    {
      title: "Crop Rotation and Diversification",
      category: "Agriculture Practices",
      description: "Crop rotation and diversification are techniques used to enhance soil health and reduce pest buildup.",
      content: "By rotating crops and diversifying plant varieties, farmers can break pest cycles, improve soil nutrients, and reduce the risk of crop failure."
    },
    {
      title: "Sustainable Seed Selection",
      category: "Agriculture Practices",
      description: "Sustainable seed selection focuses on choosing seeds that are well-suited to the local environment and are resistant to pests and diseases.",
      content: "Selecting seeds from local and indigenous varieties can increase crop resilience, reduce dependence on chemical inputs, and promote biodiversity."
    },
    {
      title: "Indigenous Crops",
      category: "Agriculture Practices",
      description: "Indigenous crops are native plants that have adapted to the local environment and have high nutritional value.",
      content: "Growing indigenous crops helps maintain biodiversity, reduces the need for irrigation and chemical fertilizers, and promotes food security."
    },
    {
      title: "Livestock and Pasture Management",
      category: "Livestock Management",
      description: "Livestock and pasture management involves practices that promote the health of animals and the sustainability of pastures.",
      content: "Proper grazing techniques, rotational grazing, and maintaining healthy pasturelands are key aspects of sustainable livestock farming."
    }
  ];

  try {
    await Content.insertMany(topics);
    console.log("Content inserted successfully!");
  } catch (error) {
    console.error("Error inserting content:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertContent();
