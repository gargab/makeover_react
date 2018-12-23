import baseURL from "./baseUrl.js";

export const postData = (route,config) => {
var dynamicUrl = baseURL + '/' + route;
  return fetch(dynamicUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(config)
}).then((res) => {
  let status = res.status;
  let data = res.json();
  return Promise.all([status, data]);
}).catch(error => {
    console.error(error);
    return { name: "network error", description: "" };
  });
}
