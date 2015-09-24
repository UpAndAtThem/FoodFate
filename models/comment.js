/**
 * Created by MrComputer on 9/23/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var likedRestaurants = new Schema({

    restname: { type: String, required: true},
    mealeaten: { type: String, required: true },
    rating: { type: Number, required: true},
    additional: { type: String }

});

module.exports = mongoose.model('LikedRestaurants', likedRestaurants);
