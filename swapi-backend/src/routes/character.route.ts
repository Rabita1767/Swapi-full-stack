import express from "express";
import { Request } from "express";
import characterController from "../controllers/character.controller";

const router=express.Router();

router.get("/:id",characterController.getCharacterById);
router.get("/",characterController.getAll);

export default router;