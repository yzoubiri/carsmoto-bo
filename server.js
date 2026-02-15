// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser uniquement ton front Azure Static Web Apps
app.use(cors({
  origin: "https://lemon-beach-0d0918603.6.azurestaticapps.net"
}));

app.use(express.json());

const voitures = [
  { id: 1, marque: "Ferrari", modele: "488 GTB", annee: 2020 },
  { id: 2, marque: "Lamborghini", modele: "Huracán EVO", annee: 2021 },
  { id: 3, marque: "Porsche", modele: "911 Carrera", annee: 2019 },
  { id: 4, marque: "BMW", modele: "M4 Competition", annee: 2022 },
  { id: 5, marque: "Mercedes", modele: "AMG GT", annee: 2021 }
];

app.get("/api/voitures", (req, res) => {
  res.json(voitures);
});

app.get("/api/voitures/:id", (req, res) => {
  const voiture = voitures.find(v => v.id === parseInt(req.params.id));
  if (!voiture) {
    return res.status(404).json({ message: "Voiture non trouvée" });
  }
  res.json(voiture);
});

app.listen(PORT, () => {
  console.log(`API Voitures démarrée sur http://localhost:${PORT}`);
});
