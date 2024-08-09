import Product from "../models/ProductSchema.js";
import ProductStat from "../models/ProductStatSchema.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Fetch product stats and merge with product documents in one query using Promise.all()
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const productStat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, productStat };
      })
    );
    res.json(productsWithStats);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Implement pagination, sorting, and search functionality here
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
