const mongoose=require('mongoose');
const SearchSchema=mongoose.Schema({
    email_id:{type:String},
    time:{type:Date},
    movie_key:{type:String},
    liked_or_not:{type:String}
});
module.exports =mongoose.model("Search",SearchSchema);
