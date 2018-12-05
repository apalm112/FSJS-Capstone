var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BestSellerSchema = new Schema({
	totalCount: { type: Number },
	num_results: { type: Number },
	last_modified: { type: String },
	list_name: { type: String },
	bestsellers_date: { type: String },
	rank: { type: Number },
	primary_isbn13: { type: String },
	description: { type: String },
	title: { type: String },
	author: { type: String },
	book_image: { type: String },
	amazon_product_url: { type: String }
});
// 
// var BestSeller = mongoose.model('BestSeller', BestSellerSchema);
//
// module.exports.BestSeller = BestSeller;




/*var BookSchema = new Schema({
	id: { type: String },
	num_results: { type: Number },
	last_modified: { type: Date },
	results: {
		list_name: { type: String },
		bestsellers_date: { type: Date },
	},
	books: {
		rank: { type: Number },
		title: { type: String },
		author: { type: String },
		description: { type: String },
		primary_isbn13: { type: Number },
		book_image: { type: String },
		amazon_product_url: { type: String }
	},
});*/
