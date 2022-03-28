import {Router}  from 'express';
const router:Router = Router();

import productController from './../controller/ProductController';
import reviewController from './../controller/ReviewController'


router.get('/products', productController.getProducts);
router.post('/product', productController.saveProduct);
router.get('/products/:id', productController.getProductWithId); 
router.post('/review',reviewController.addReview);


export default router;
