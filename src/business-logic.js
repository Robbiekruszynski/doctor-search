export class apiCall {
  runDoctor() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let api_key = ""
      let url = "";
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
