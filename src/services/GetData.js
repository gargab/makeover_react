import baseURL from "./baseUrl.js";

export const getData = (route,params) => {

  var dynamicUrl = baseURL + '/' + route;

  if(Object.keys(params).length > 0){
    dynamicUrl = dynamicUrl + '?';
    for(key in params){
      dynamicUrl = dynamicUrl + key + '=' + params[key] + '&';
    }
  }
console.log(dynamicUrl);

//Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

return fetch(dynamicUrl, {
method: 'GET'
}).then((res) => {
let status = res.status;
let data = res.json();
return Promise.all([status, data]);
}).catch(error => {
  console.error(error);
  return { name: "network error", description: "" };
});

}
