const mongoose=require("mongoose");

const DB_URL="mongodb+srv://haseebkhan:haseeb112@tryclustor.vrfecf4.mongodb.net/bookhouse";

const ConnectDb=async ()=>{
try {
    await mongoose.connect(DB_URL);
    console.log("connecting with database is successfull");
    
} catch (error) {
    console.log("error while connected with data base "+ error.message);
}
}

module.exports=ConnectDb