exports.vaildateObject= function(req){

	return validateAllItems(req.body);
}

exports.validateObject= function(item){
	return validateAllItems(item);
}

function validateAllItems(dataItem){
	var result = {valid:false, message:""};

	if(dataItem===undefined || dataItem===null){
		result.valid = false;
		result.message="Passed object is undefined or null";
		return result;
	}
	for(item in dataItem){
		if(typeof item ==="string" && item=="_id"){
			continue;
		}
		if(item===undefined || item===null){
			result.message+=item+",";
		}
		if(typeof item==="array" && item.length==0){
			result.message+=item+",";
		}else if(typeof item==="string" && item.length==0){
			result.message+=item+",";
		}else if(typeof item === "number" && isNaN(item)){
			result.message+=item+",";
		}else if(typeof item === "date"){
			try{
				new Date(item.toDateString());
			}catch(e){
				result.message+=item+",";
			}
		}
	}		
	if(result.message.length>0){
		result.message+=item+" Field(s) are invalid.";
		result.valid= false;
	}else{
		result.message="";
		result.valid=true;
	}

	return result;
}

exports.validateUndefined = function(item){
 return (typeof item==="undefined" || item===null);
}

exports.validateString = function(value){
	return (typeof value==="string" && value.length>0);
}

exports.validateNumber = function(value){
	return isNaN(value);
}

exports.validateArray=function (list){
	return (typeof list==="array" && list.length>0);
}

exports.validateDate = function(item){
	return (typeof item=== "date" && new Date(item.toDateString()));
}