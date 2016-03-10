function collect(obj){
	if (!obj.length) return false;
	var messages = [];
	for(var i = 0;i < obj.length;i++){
		if (obj[i].collect) {
			messages.push(obj[i]);
		}
	}
	return messages;
}
