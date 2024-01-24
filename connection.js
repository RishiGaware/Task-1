const mongoose=require("mongoose")

const connect = mongoose.connect("mongodb://localhost:27017/project1");

//check DataBase Connect Or Not

connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database Is Not Connected");
});
//Create a Schema
