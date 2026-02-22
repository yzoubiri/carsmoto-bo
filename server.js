import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const BDD_URL = process.env.BDD_URL || "BDD_URL non définie";

app.use(cors({
  origin: "https://lemon-beach-0d0918603.6.azurestaticapps.net"
}));

app.use(express.json());


// =====================================================
// 🔥 SIMULATION : 3 SECONDES PUIS 404 POUR TOUT /api
// =====================================================
app.use("/api", async (req, res) => {

  const delay = 3000;

  console.log(`⏳ Requête reçue : ${req.method} ${req.originalUrl}`);
  console.log(`⌛ Attente de ${delay}ms...`);

  await new Promise(resolve => setTimeout(resolve, delay));

  console.log("❌ Retour 404 simulé");

  return res.status(404).json({
    error: "Not Found",
    message: "Ressource non trouvée (simulation)",
    path: req.originalUrl,
    timestamp: new Date()
  });

});


// =====================================================

app.listen(PORT, () => {
  console.log(`🚀 API démarrée sur http://localhost:${PORT}`);
  console.log("📦 BDD_URL =", BDD_URL);
});
