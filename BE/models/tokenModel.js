import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    refresh_token : {
        type: String
    }
})
const Token = mongoose.model('Token', tokenSchema)
export default Token
