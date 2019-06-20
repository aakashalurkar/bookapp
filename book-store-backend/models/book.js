var mongoose =require('mongoose');

var Books= mongoose.model('Books',{
    bookID : {
        type : Number
    },
    title : {
        type : String
    },
    author :{
        type : String
    }
})

module.exports = {Books};