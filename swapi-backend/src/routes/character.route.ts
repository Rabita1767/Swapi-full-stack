import express from "express";
import { Request } from "express";
import characterController from "../controllers/character.controller";

const router=express.Router();
console.log("enter");

// router.get("/",characterController.getAllCharacters);
router.get("/:id",characterController.getCharacterById);
router.get("/search/searchByName",characterController.searchCharacterByName);
router.get("/",characterController.getAll);

export default router;