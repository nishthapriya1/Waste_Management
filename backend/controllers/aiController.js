import {
 getCategory
}
from "../services/ai.js";

export const detectCategory=
async(req,res)=>{

 try{

  console.log(req.body);

  const {
   description
  }=req.body;

  const category=
  await getCategory(
   description
  );

  res.json({
   category
  });

 }
 catch(err){

  console.log(err);

  res.status(500).json({
   msg:err.message
  });

 }

};