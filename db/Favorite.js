const {mongoose} = require("./connectDataBase");
const {nanoid} = require("nanoid");
const { Pet } = require("./Pet");


//Schema
let favoritesSchema = mongoose.Schema({
    userID:{
        //type: String,
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
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
        }
    }]   
})

/*favoritesSchema.statics.getFavorites = async ()=>{
    return await Favorite.find();

}*/

//Falta poner más en name
favoritesSchema.statics.getFavorites = async (userID)=>{
    return await Favorite.findOne({userID}).populate({path:"favorites.publication",model:"Pet",select:"name image id"})
}


favoritesSchema.statics.getdoc = async(userID)=>{
    return await Favorite.findOne({userID: userID});
    
}

/*favoritesSchema.statics.findFav = async(favID)=>{
    return await Pet.findOne({"favorites.id": favID})
}*/

favoritesSchema.methods.updateData = async function(datos){
    return await Favorite.findOneAndUpdate(
                {_id:this._id},
                {$set:datos},
                {new: true}
                );
}


favoritesSchema.statics.crearFavorites = async function(favoriteDoc){
    let newFavorite = Favorite(favoriteDoc);
    console.log(favoriteDoc);
    return await newFavorite.save()

}


//Modelo
const Favorite = mongoose.model("Favorite", favoritesSchema);

async function saveFavorite(){
    let newFavorite = {
        userID: "62719b8c9b009ec84c73a8d6",
        favorites:[{
            publication: "6271e7bb84866d60ba6a245e",
            id: nanoid(),
            comment: "Jessica 1"
            
        }]
    
    }
    let favoriteToSave = Favorite(newFavorite);

    let resp = await favoriteToSave.save();
    console.log(resp);

}

//saveFavorite();

async function testNewFavorite(){
    let doc = await Favorite.findOne({userID: '62719b8c9b009ec84c73a8d6'}).lean();
    if(doc){
        doc.favorites.push({publication: '6271e71ed581afd58f42e429', id: nanoid(), comment: 'Jessica 1'});
        let updated = await Favorite.findOneAndUpdate({userID: '62719b8c9b009ec84c73a8d6'}, {$set: {favorites: doc.favorites}}, {new: true})
        console.log(updated);
    }
}


//testNewFavorite();

async function getFavorites(){
    let favorites = await Favorite.find(/*{userID: "67890"},{_id:0,comment:1}*/);
    console.log(favorites);
}

//getFavorites();

module.exports = {Favorite};