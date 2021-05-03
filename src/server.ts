import express from "express";
import "reflect-metadata";
import "./database";
import { router } from "./router";
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(3333, () => console.log("Server is running on port 3333 !"));