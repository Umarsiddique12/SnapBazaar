const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/authMiddleware');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get all items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's items (protected)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add item (protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { title, description, price, sellerName, whatsappNumber } = req.body;


  if (!title || !price) return res.status(400).json({ msg: 'Title and price required' });

  try {
    const newItem = new Item({
      user: req.user.id,
      title,
      description,
      price,
        sellerName,       // add this
        whatsappNumber,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Optional: delete and update routes can be added here...
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Use deleteOne instead of remove()
    await item.deleteOne();

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error('Delete route error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
