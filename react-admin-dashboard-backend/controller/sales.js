import OverallStat from "../models/OverallStat.js";

// Endpoint to get overall statistics for a given year
export const getSales = async (req, res) => {
  try {
    const stats = await OverallStat.find();
    if (!stats) {
      return res.status(404).json({ message: "Overall statistics not found." });
    }
    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
