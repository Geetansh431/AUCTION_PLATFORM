import {
    addNewAuctionItem,
    getAllItems,
    getAuctionDetails,
    getMyAuctionItems,
    removeFromAuction,
    republishItem
} from "../controllers/auctionItemController.js";

import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);
router.get("/allitems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get("/myitems", isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Auctioneer"), removeFromAuction);
router.put("/item/republish/:id", isAuthenticated, isAuthorized("Auctioneer"), republishItem);

export default router;
