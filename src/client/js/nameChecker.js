function checkForName() {
    const regex = new RegExp ('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
      if (regex.test() === true) {
          return "Valid URL";
      } else {
          return "Invalid URL";
      }
  }
  
  export { checkForName }