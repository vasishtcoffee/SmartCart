import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../data/mockProducts.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

export const getProducts = (req, res) => {
  const { search } = req.query;

  if (search) {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(products);
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};
