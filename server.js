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
  { id: 1, marque: "Ferrari", modele: "488 GTB", annee: 2020, image: "https://via.placeholder.com/150?text=Ferrari" },
  { id: 2, marque: "Lamborghini", modele: "Huracán EVO", annee: 2021, image: "https://via.placeholder.com/150?text=Lambo" }
];

// GET toutes les voitures
app.get("/api/voitures", (req, res) => res.json(voitures));

// POST ajouter une voiture
app.post("/api/voitures", (req, res) => {
  const { marque, modele, annee, image } = req.body;
  if (!marque || !modele || !annee || !image) {
    return res.status(400).json({ message: "Champs manquants" });
  }
  const nouvelleVoiture = {
    id: voitures.length ? voitures[voitures.length - 1].id + 1 : 1,
    marque,
    modele,
    annee,
    image
  };
  voitures.push(nouvelleVoiture);
  res.status(201).json(nouvelleVoiture);
});

// PUT modifier une voiture
app.put("/api/voitures/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const voiture = voitures.find(v => v.id === id);
  if (!voiture) return res.status(404).json({ message: "Voiture non trouvée" });

  const { marque, modele, annee, image } = req.body;
  if (marque) voiture.marque = marque;
  if (modele) voiture.modele = modele;
  if (annee) voiture.annee = annee;
  if (image) voiture.image = image;

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
