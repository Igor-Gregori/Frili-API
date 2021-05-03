import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Friend } from "../models/Friend";
import path from "path";

class FriendsController {
  async create(request: Request, response: Response) {
    const { name, cellphone, email } = request.body;

    const photoUrl = request.file === undefined ? "" : request.file.filename;

    const friendsRepository = getRepository(Friend);

    const friend = friendsRepository.create({
      name,
      cellphone,
      email,
      photoUrl,
    });

    await friendsRepository.save(friend);

    return response.status(200).json(friend);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const friendsRepository = getRepository(Friend);

    const result = await friendsRepository.delete({ id });

    return response.status(200).json(result);
  }

  async update(request: Request, response: Response) {
    const { id, name, cellphone, email, photoUrl } = request.body;

    const friendsRepository = getRepository(Friend);

    const friend = await friendsRepository.findOne({ id });

    if (!friend) {
      return response.status(400).json({
        error: "Friend no exists !",
      });
    }

    friend.name = name;
    friend.cellphone = cellphone;
    friend.email = email;
    friend.photoUrl = photoUrl;

    await friendsRepository.save(friend);

    return response.status(200).json("The friend has been updated !");
  }

  async returnAll(request: Request, response: Response) {
    const friendsRepository = getRepository(Friend);

    const friends = await friendsRepository
    .createQueryBuilder("friend")
    .orderBy("friend.name", "ASC").getMany();

    return response.status(200).json(friends);
  }

  async makeFavorite(request: Request, response: Response) {
    const { id } = request.params;

    const friendsRepository = getRepository(Friend);

    const friend = await friendsRepository.findOne({ id });

    if (!friend) {
      return response.status(400).json({
        error: "Friend no exists !",
      });
    }

    friend.is_favorite = true;

    await friendsRepository.save(friend);

    return response
      .status(200)
      .json(`${friend.name} was added in your favorite friend list !`);
  }

  async savePhoto(request: Request, response: Response) {
    return response
      .status(200)
      .json({ filename: request.file.filename.toString() });
  }

  async getPhoto(request: Request, response: Response){
    const {imageName} = request.params;

    const localImage = `${path.resolve(__dirname, "..", "..", "tmp", "uploads")}/${imageName}`;

    return response.status(201).sendFile(localImage);

  }
}

export { FriendsController };
