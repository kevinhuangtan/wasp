exports.getTimePassed = function(date){

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

exports.objectToArray = function(obj){
  const keys = Object.keys(obj);
  var ret = keys.map(function(key, i){
    return obj[key];
  })
  return ret;
}

exports.addKeyToProducts = function(parent, childName){
  var childKeys = Object.keys(parent[childName]);
  var children = parent[childName];
  childKeys.map(function(key){
    children[key]['.key'] = key;
  })
  return children
}
