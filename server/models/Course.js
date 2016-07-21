var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	title: {type:String, require:'{PATH} is required!'},
	featured: {type:Boolean, require:'{PATH} is required!'},
	published: {type:Date, require:'{PATH} is required!'},
	tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses(){
	Course.find({}).exec(function(err, collection){
		if(collection.length == 0){
			Course.create({title:'C# for Sociopaths', featured:true, published: new Date('10/5/2013'), tags:['c#']});
			Course.create({title:'C# for .NET', featured:false, published: new Date('15/5/2013'), tags:['c#', '.NET']});
			Course.create({title:'Java', featured:true, published: new Date('10/6/2013'), tags:['Java']});
			Course.create({title:'Head first J2EE', featured:true, published: new Date('15/6/2013'), tags:['J2EE']});
			Course.create({title:'Springs', featured:true, published: new Date('10/5/2014'), tags:['Springs']});
			Course.create({title:'Spring AOP', featured:false, published: new Date('17/7/2014'), tags:['Spring AOP']});
			Course.create({title:'Hibernate 4.0', featured:true, published: new Date('15/7/2014'), tags:['Hibernate']});
			Course.create({title:'Java Compiler', featured:false, published: new Date('20/2/2015'), tags:['Compiler']});
			Course.create({title:'Java 8 features', featured:true, published: new Date('20/5/2015'), tags:['java','core java']});
			Course.create({title:'Digital Media', featured:false, published: new Date('10/5/2013'), tags:['digital media']});

		}
	})
}

exports.createDefaultCourses = createDefaultCourses;