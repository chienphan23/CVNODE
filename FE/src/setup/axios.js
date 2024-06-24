import axios from "axios";

axios.defaults.withCredentials = true;

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 50000
  });
  
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // không cần kiểm tra accessToken với router login
    // if(config.url.indexOf("/login") >=1){
    //   return config
    // }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(async function (response) {
  // console.log(Cookies.get("access_token"))
  // console.log(Cookies.get("refresh_token"))
  const config = response.config  // tương tự như câu request
    if(response.data?.message === "you are not logged in ! please log in to get access"){// khong co token 
      window.location.pathname = "/login";
      return response;
    }
    if(response.data?.message === "TokenExpiredError"){// token het han
      // eslint-disable-next-line no-unused-vars
      const token = await instance.post("/users/refreshToken")
      return instance(config);// gọi lại câu lệnh
    }
    if(response.data?.message === "JsonWebTokenError"){// sai token
      window.location.pathname = "/login"
      return response;
    }
    return response.data
  }, function (error) {
    console.log("alo1")
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default instance