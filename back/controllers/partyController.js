const PartyModel = require("../models/Party");
const { update } = require("./serviceController");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };
      //se budget for menor que serviços, retorna erro
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ error: "Budget is quite insufficient" });
        return;
      }
      const response = await PartyModel.create(party);

      res.status(201).json({ response, msg: "Party created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create party" });
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.status(200).json(parties);
    } catch (error) {
      res.status(500).json({ error: "Failed to get parties" });
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ error: "Party not found" });
        return;
      }
      res.status(200).json(party);
    } catch (error) {
      res.status(500).json({ error: "Failed to get party" });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);
      if (!party) {
        res.status(404).json({ error: "Party not found" });
        return;
      }
      const deletedParty = await PartyModel.findByIdAndDelete(id);
      res.status(200).json({ deletedParty, msg: "Party deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete party" });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ error: "Budget is quite insufficient" });
        return;
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);
      if (!updatedParty) {
        res.status(404).json({ error: "Party not found" });
        return;
      }
      res.status(200).json({ party, msg: "Party updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update party" });
    }
  },
};

module.exports = partyController;
