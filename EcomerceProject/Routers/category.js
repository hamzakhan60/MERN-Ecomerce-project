const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const { tokenDecoder } = require("../Controllers/jwtToken");
const productsModel = require("../Modles/products");
const clothesModel = require("../Modles/clothes");
const fragranceModel = require("../Modles/fragrances");


router.get("/:SubCategory",async(req,res)=>{
    console.log(req.params.SubCategory);
    
//     const clothMatches = await productsModel.find({ 'clothId.SubCategory': req.params.SubCategory }).populate('clothId');
// const fragranceMatches = await productsModel.find({ 'fragranceId.SubCategory': req.params.SubCategory }).populate('fragranceId');


    const products=await productsModel.find().populate({
        path: 'clothId',
        model:clothesModel,
        match: { SubCategory: req.params.SubCategory },
      
      })
      .populate({
        path: 'fragranceId',
        model:fragranceModel,
        match: { SubCategory: req.params.SubCategory } ,
      
      })
      .exec();
      const filterProducts=products.filter(p=>{
         if(p.clothId!=null || p.fragranceId!=null)
              return p;
      })

 
      if(filterProducts)
        res.send(filterProducts);
    else
      res.send("Err Occured");
})
module.exports=router