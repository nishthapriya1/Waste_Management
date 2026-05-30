import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
new GoogleGenerativeAI(
 process.env.GEMINI_API_KEY
);

const localCategory=(txt)=>{

 const t=txt.toLowerCase();

 if(
  t.includes("medicine") ||
  t.includes("medicines") ||
  t.includes("tablet") ||
  t.includes("syrup")
 )
  return "medical";

 if(
  t.includes("laptop") ||
  t.includes("mobile") ||
  t.includes("charger") ||
  t.includes("keyboard") ||
  t.includes("earphone")
 )
  return "electronic";

 if(
  t.includes("paper") ||
  t.includes("book") ||
  t.includes("newspaper")
 )
  return "paper";

 if(
  t.includes("cloth") ||
  t.includes("shirt") ||
  t.includes("jeans")
 )
  return "cloth";

 return "paper";
};

export const getCategory=
async(txt)=>{

 try{

  const model=
  genAI.getGenerativeModel({
   model:"gemini-2.0-flash"
  });

  const r=
  await model.generateContent(
  `
  Classify waste into:

  electronic
  paper
  cloth
  medical

  Return only one word.

  Waste:
  ${txt}
  `
  );

  return r.response
  .text()
  .trim()
  .toLowerCase();

 }
 catch(err){

  console.log(
   "Gemini Failed"
  );

  return localCategory(txt);

 }

};