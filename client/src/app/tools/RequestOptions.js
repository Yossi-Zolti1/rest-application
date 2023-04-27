class RequestOptions {
    constructor() {
    }

    static request(methods,body,token) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //  if (token.length > 0) {
         myHeaders.append("Authorization", "Bearer " + token);
        //  }
        let requestOpt = {
          method: methods,
          body: body,
          headers: myHeaders,
          redirect: 'follow'
        }
        return requestOpt;
    }
   
  
   
}

export default RequestOptions;