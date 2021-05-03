import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { FriendsController } from "./controllers/FriendsController";

const router = Router();

const friendsController = new FriendsController();

router.get("/friends", friendsController.returnAll);

router.post(
  "/friends",
  multer(multerConfig).single("fphoto"),
  friendsController.create
);

router.delete("/friends/:id", friendsController.delete);

router.put("/friends", friendsController.update);

router.put("/favoritefriend/:id", friendsController.makeFavorite);

router.get("/imagefriend/:imageName", friendsController.getPhoto);

router.post(
  "/friendphoto",
  multer(multerConfig).single("fphoto"),
  friendsController.savePhoto
);

export { router };

