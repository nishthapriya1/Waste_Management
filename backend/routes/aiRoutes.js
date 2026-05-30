import express
from "express";

import {
 detectCategory
}
from "../controllers/aiController.js";

const r=express.Router();

r.post(
 "/category",
 detectCategory
);

export default r;