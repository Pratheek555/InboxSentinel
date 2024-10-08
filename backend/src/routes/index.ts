import express from "express";
import authorisationRouter from "./authorisation"

const router = express.Router();

router.use("/oauth", authorisationRouter);

export default router;
