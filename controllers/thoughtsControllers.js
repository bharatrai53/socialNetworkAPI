const thoughtsControllers = {
    createThoughts: async ({ params, body }, res) => {
      try {
        const { _id } = await Thoughts.create(body);
        const updatedUser = await Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "No user found" });
        }
        return res.json(updatedUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    getAllThoughts: async (req, res) => {
      try {
        const thoughts = await Thoughts.find({})
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v");
        return res.json(thoughts);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    getThoughtsById: async ({ params }, res) => {
      try {
        const thought = await Thoughts.findOne({ _id: params.id })
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v");
        if (!thought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
      } catch (err) {
        return res.status(400).json(err);
      }
    },
  
    updateThoughts: async ({ params, body }, res) => {
      try {
        const updatedThought = await Thoughts.findOneAndUpdate(
          { _id: params.id },
          body,
          { new: true, runValidators: true }
        )
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v");
        if (!updatedThought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(updatedThought);
      } catch (err) {
        return res.json(err);
      }
    },
  
    deleteThoughts: async ({ params }, res) => {
      try {
        const deletedThought = await Thoughts.findOneAndDelete({ _id: params.id });
        if (!deletedThought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(deletedThought);
      } catch (err) {
        return res.status(400).json(err);
      }
    },
  
    addReaction: async ({ params, body }, res) => {
      try {
        const updatedThought = await Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .populate({ path: "reactions", select: "-__v" })
          .select("-__v");
        if (!updatedThought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(updatedThought);
      } catch (err) {
        return res.status(400).json(err);
      }
    },
  
    deleteReaction: async ({ params }, res) => {
      try {
        const updatedThought = await Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        );
        if (!updatedThought) {
          return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(updatedThought);
      } catch (err) {
        return res.status(400).json(err);
      }
    }
};

module.exports = thoughtsControllers;