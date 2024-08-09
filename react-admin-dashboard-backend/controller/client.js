import Product from "../models/ProductSchema.js";
import ProductStat from "../models/ProductStatSchema.js";
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
