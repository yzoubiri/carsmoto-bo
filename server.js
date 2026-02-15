// server.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON
app.use(express.json());

// Exemple de données (mock)
const voitures = [
  { id: 1, marque: "Ferrari", modele: "488 GTB", annee: 2020 },
  { id: 2, marque: "Lamborghini", modele: "Huracán EVO", annee: 2021 },
  { id: 3, marque: "Porsche", modele: "911 Carrera", annee: 2019 },
  { id: 4, marque: "BMW", modele: "M4 Competition", annee: 2022 },
  { id: 5, marque: "Mercedes", modele: "AMG GT", annee: 2021 }
];

// Route GET pour récupérer toutes les voitures
app.get("/api/voitures", (req, res) => {
  res.json(voitures);
});

// Route GET pour récupérer une voiture par ID
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
