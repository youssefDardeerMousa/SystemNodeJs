import { routerNews } from "./modules/news/news.router.js";
import routeruser from "./modules/users/users.router.js";
import dotenv from 'dotenv'
dotenv.config()  // path 
const port = process.env.PORT
export const appcode=(app,express)=>{
app.use(express.json());
app.use('/',routeruser)
app.use('/',routerNews)
app.listen(port,()=>{
    console.log(`Server Is Running On port ${port}`);
})
}