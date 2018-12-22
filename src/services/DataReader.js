export const readData = (config) => {

  var URL = `http://192.168.0.100:1234/admin`;
    return fetch(URL)
            .then((res) => res.json());
}
