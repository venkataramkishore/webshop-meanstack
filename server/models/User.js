var  mongoose = require('mongoose');
var utilities = require('../utilities/encryption');

var userSchema = mongoose.Schema({
		firstName:{type:String, required:'{PATH} is required!'},
		lastName:{type:String, required:'{PATH} is required!'},
		userName:{type:String, required:'{PATH} is required!', unique:true},
		salt:{type:String, required:'{PATH} is required!'},
		hashPwd:{type:String, required:'{PATH} is required!'},
		roles:[String],
		house:{type:String, required:'{PATH} is required!'},
		street:{type:String, required:'{PATH} is required!'},
		area:{type:String, required:'{PATH} is required!'},
		city:{type:String, required:'{PATH} is required!'},
		state:{type:String, required:'{PATH} is required!'},
		pincode:{type:String, required:'{PATH} is required!'}
	});

	userSchema.methods = {
		authenticate:function(passwordToMatch){
			return utilities.createHashPwd(this.salt, passwordToMatch) === this.hashPwd;
		},
		hasRole:function(role){
			return this.roles.indexOf(role) > -1;
		}
	}
	var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function(){
		User.find({}).exec(function(err, collection){
			if(collection.length === 0){
				
				var salt, hashPwd;
				salt = utilities.createSalt();
				hashPwd = utilities.createHashPwd(salt, 'ram');
				User.create({firstName:'Ram', lastName:'Kishore', userName:'ram', salt:salt,hashPwd:hashPwd, roles:['Admin'],
				house:"D.No SB",
				street:"Kothaguda Road",
				area:"Kondapur",
				city:"Hyderabad",
				state:"Andhra Pradesh",
				pincode:"500032"});
				salt = utilities.createSalt();
				hashPwd = utilities.createHashPwd(salt, 'anil');
				User.create({firstName:'Anil', lastName:'Kumar', userName:'anil', salt:salt,hashPwd:hashPwd, roles:[],
				house:"D.No SC",
				street:"Miyapur Road",
				area:"Bhachupalli",
				city:"Hyderabad",
				state:"Andhra Pradesh",
				pincode:"500066"});
				salt = utilities.createSalt();
				hashPwd = utilities.createHashPwd(salt, 'shyam');
				User.create({firstName:'Shyam', lastName:'Setty', userName:'shyam', salt:salt,hashPwd:hashPwd, roles:[],
				house:"D.No 456",
				street:"HSR Layout",
				area:"Kondapur",
				city:"Hyderabad",
				state:"Andhra Pradesh",
				pincode:"500032"});
			}
		});
}