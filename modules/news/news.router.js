import { Router } from "express";
import { CreateNews, UpdateNews, allNews, alluserNews, deleteNews } from "./news.controller.js";
import { IsAuthenticated } from "../../Middleware/auth.middleware.js";

export const routerNews=Router()
routerNews.post("/CreateNews",IsAuthenticated,CreateNews)
routerNews.get("/News",allNews)
routerNews.get("/News/:id",alluserNews)
routerNews.put("/UpdateNews/:idd",IsAuthenticated,UpdateNews)
routerNews.delete("/DeleteNews/:idd",IsAuthenticated,deleteNews)