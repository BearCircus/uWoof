const {mongoose} = require("./connectDataBase");
const {nanoid} = require("nanoid");
const { Pet } = require("./Pet");


//Schema
let favoritesSchema = mongoose.Schema({
    userID:{
        //type: String,
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    favorites:[{
        
        publication: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Pet"
        },

        id: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }/*,
        fecha: {
            type: String,
            required: true
        }*/

    }]   
})


/*favoritesSchema.statics.getFavorites = async ()=>{
    return await Favorite.find();

}*/


//Falta poner más en name
favoritesSchema.statics.getFavorites = async (userID)=>{
    return await Favorite.findOne({userID}).populate({path:"favorites.publication",model:"Pet",select:"name, animal, age,  "})
}
//update y create (siempre antes de saveFavorite)
//Modelo
const Favorite = mongoose.model("Favorite", favoritesSchema);

async function saveFavorite(){
    let newFavorite = {
        userID: "626c7fd9fc04a3df7acbefcf",
        favorites:[{
            publication: "626d85d18b5ce7963be68a60",
            id: nanoid(),
            comment: "texto 3"
            //fecha: ""
        }]
    
    }
    let favoriteToSave = Favorite(newFavorite);

    let resp = await favoriteToSave.save();
    console.log(resp);

}

//saveFavorite();

async function getFavorites(){
    let favorites = await Favorite.find(/*{userID: "67890"},{_id:0,comment:1}*/);
    console.log(favorites);
}

//getFavorites();

module.exports = {Favorite};