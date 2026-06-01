const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct

} = require("../controller/productController")

router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', auth, createProduct);
router.put('/:id',auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
