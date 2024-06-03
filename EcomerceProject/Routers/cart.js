const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder1 } = require("../Controllers/jwtToken");
const productsModel = require("../Modles/products");
const cartModel = require("../Modles/cart");
const customersModel = require("..//Modles/customers");
const clothesModel = require("../Modles/clothes");
const fragranceModel = require("../Modles/fragrances");
const { authorizeUser } = require("../Middleware/authorization");
const {getpipeline} =require("../View/cartProductPrice");



router.use(authorizeUser);
router.use(tokenDecoder1);

router.get("/", async (req, res) => {
    try {
        const customerDetail = await customersModel.findOne({ login: req.query.id });
        const cartData = await cartModel.findOne({ _id: customerDetail.cart }).populate({
            path: 'items.productId',
            populate: [
                { path: 'clothId', model: clothesModel },
                { path: 'fragranceId', model: fragranceModel },
            ]
        }).exec();
        const pipeline=getpipeline(cartData._id);
        const pipelineOutput = await cartModel.aggregate(pipeline).exec();
        console.log(pipelineOutput[0].totalPrice);
       
        console.log(cartData);
        if (cartData){
        const responseObj={
            cartData:cartData,
            subTotal:pipelineOutput[0].totalPrice,
        }
            res.status(200).send(responseObj);}
        else
            res.status(204).send("Your Cart is Empty");
    }
    catch {
        res.status(500).send("Error Occured");
    }



});
router.put("/", async (req, res) => {

    console.log(req.body);
    console.log(req.query)
    const data = {
        quantity: req.body.quantity,
        size: req.body.size,
        color: req.body.color,
        productId:req.body.productId,
    }
    const CustomerCartId = await customersModel.findOne({ login: req.query.id });

    const update = await cartModel.findOneAndUpdate({ _id: CustomerCartId.cart, 'items._id': req.body.itemsId }, { $set: { 'items.$': data } }, { new: true });
    console.log(update);
    const pipeline=getpipeline(CustomerCartId.cart);
    const pipelineOutput = await cartModel.aggregate(pipeline).exec();

    console.log(pipelineOutput);
    if (update){
        const responseObj={
            cartData:update,
            subTotal:pipelineOutput[0].totalPrice,
        }
        res.status(200).send(responseObj);
    }
    else
        res.status(400).send("Err Occured");


});
router.post("/", async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request query:", req.query);
  
    try {
      const product = await productsModel.findOne({ _id: req.body.productId });
      if (!product) {
        console.log("Product not found:", req.body.productId);
        return res.status(404).send("Product not found");
      }
  
      const customer = await customersModel.findOne({ login: req.query.id });
      if (!customer) {
        console.log("Customer not found:", req.query.id);
        return res.status(404).send("Customer not found");
      }
  
      const cart = await cartModel.findOne({ _id: customer.cart });
      if (cart) {
        let itemUpdated = false;
        for (const item of cart.items) {
          if (item.size === req.body.size && item.color === req.body.color && item.productId.toString() === req.body.productId) {
            item.quantity += req.body.quantity;
            item.price = product.Price * item.quantity; // Update price accordingly
            itemUpdated = true;
            break;
          }
        }
  
        if (itemUpdated) {
          const updatedCart = await cart.save();
          console.log("Cart updated with existing item:", updatedCart);
          return res.status(200).send(updatedCart);
        } else {
          const newCartProduct = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            size: req.body.size,
            color: req.body.color,
            price: product.Price * req.body.quantity,
          };
  
          console.log("Adding new product to cart:", newCartProduct);
          cart.items.push(newCartProduct);
          const updatedCart = await cart.save();
          console.log("Cart updated with new item:", updatedCart);
          return res.status(200).send(updatedCart);
        }
      } else {
        const newCart = {
          _id: customer.cart,
          items: [{
            productId: req.body.productId,
            quantity: req.body.quantity,
            size: req.body.size,
            color: req.body.color,
            price: product.Price * req.body.quantity,
          }],
        };
  
        console.log("Creating new cart:", newCart);
        const data = new cartModel(newCart);
        const result = await data.save();
        console.log("New cart created:", result);
        return res.status(200).send(result);
      }
    } catch (err) {
      console.error("Internal server error:", err);
      return res.status(500).send("Internal Server Error");
    }
  });
  

router.delete("/", async (req, res) => {
    console.log(req.query.itemsId );
    console.log(req.query.id );
    const customerDetail = await customersModel.findOne({ login: req.query.id });
    const result = await cartModel.findOneAndUpdate({ _id: customerDetail.cart },
        { $pull: { items: { _id: req.query.itemsId } } }, { new: true });
        const pipeline=getpipeline(result._id);
        let subTotal;
        if(result.items.length>0){
        const pipelineOutput = await cartModel.aggregate(pipeline).exec();
        console.log(pipelineOutput[0].totalPrice);
        subTotal=pipelineOutput[0].totalPrice;
        }
        else
            subTotal=0;
        console.log(result);
    if (result){

    const responseObj={
        cartData:result,
        subTotal:subTotal,
    }

        res.status(200).send(responseObj);}
    else
        res.status(404).send("Err Occured")


});
module.exports = router;