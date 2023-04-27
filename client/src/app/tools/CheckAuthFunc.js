import RequestOptions from './RequestOptions.js'

class CheckAuthFunc {
  constructor() {
  }


  static async checkauth() {
    let token = localStorage.getItem("token")
    if (!token) {
      return "";
    }

    let host = process.env.VUE_APP_BASE_URL;

    let api = host + "/user/checkAuth"

    return await fetch(api, RequestOptions.request("POST", "", token)).then(res => {
      if (res.status !== 200) {
        return "expired token";
      }
      return res.json();
    }
    ).then((jsonObject) => {
      return jsonObject;
    }).catch((error) => {
    });

  }



}

export default CheckAuthFunc;