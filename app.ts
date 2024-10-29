import express from "express";
const app = express();

import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";

app.use(express.json());

app.get("/check", (req, res) => {
  res.status(200).json({ message: "Fine and Working", success: true });
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.listen(3000, () => console.log("Running on 3000 port"));
