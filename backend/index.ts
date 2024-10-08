
import express from "express";
import mainRouter from "./src/routes/index"
import cors from "cors"

const app = express();
const port = process.env.PORT || 1301;
app.use(express.json())
app.use(cors())



app.use("/api/v1", mainRouter)


app.listen(port, () => {
    console.log(`app listening at port ${port}`)
})