const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    email_id:{type:String},
    time:{type:String}
});
module.exports =mongoose.model("Post",postSchema);