// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://lemon-beach-0d0918603.6.azurestaticapps.net"
}));
app.use(express.json());

let voitures = [
  { id: 1, marque: "Ferrari", modele: "488 GTB", annee: 2020 },
  { id: 2, marque: "Lamborghini", modele: "Huracán EVO", annee: 2021 },
  { id: 3, marque: "Porsche", modele: "911 Carrera", annee: 2019 },
  { id: 4, marque: "BMW", modele: "M4 Competition", annee: 2022 },
  { id: 5, marque: "Mercedes", modele: "AMG GT", annee: 2021 }
];

// GET toutes les voitures
app.get("/api/voitures", (req, res) => res.json(voitures));

// GET voiture par ID
app.get("/api/voitures/:id", (req, res) => {
  const voiture = voitures.find(v => v.id === parseInt(req.params.id));
  if (!voiture) return res.status(404).json({ message: "Voiture non trouvée" });
  res.json(voiture);
});

// POST ajouter une voiture
app.post("/api/voitures", (req, res) => {
  const { marque, modele, annee } = req.body;
  if (!marque || !modele || !annee) {
    return res.status(400).json({ message: "Champs manquants" });
  }
  const nouvelleVoiture = {
    id: voitures.length ? voitures[voitures.length - 1].id + 1 : 1,
    marque,
    modele,
    annee
  };
  voitures.push(nouvelleVoiture);
  res.status(201).json(nouvelleVoiture);
});

// PUT modifier une voiture
app.put("/api/voitures/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const voiture = voitures.find(v => v.id === id);
  if (!voiture) return res.status(404).json({ message: "Voiture non trouvée" });

  const { marque, modele, annee } = req.body;
  if (marque) voiture.marque = marque;
  if (modele) voiture.modele = modele;
  if (annee) voiture.annee = annee;

  res.json({ message: "Voiture mise à jour", voiture });
});

// DELETE supprimer une voiture
app.delete("/api/voitures/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = voitures.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ message: "Voiture non trouvée" });

  const supprimée = voitures.splice(index, 1);
  res.json({ message: "Voiture supprimée", voiture: supprimée[0] });
});

app.listen(PORT, () => {
  console.log(`API Voitures démarrée sur http://localhost:${PORT}`);
});
