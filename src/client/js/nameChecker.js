function checkForName() {
    const regex = new RegExp ('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
      if (regex.test() === true) {
          return "Valid URL";
      } else {
          return "Invalid URL";
      }
  }

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
  
  export { checkForName }