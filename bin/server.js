require("dotenv").config();
const app = require("../SRC/api");

app.use((req,res,next)=>{
    next();
});

console.log(process.env.API_PORT);
let port = process.env.API_PORT;
app.listen(port);

console.log(`listening on ${port}`);