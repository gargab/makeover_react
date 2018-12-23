import {AsyncStorage} from "react-native"

export const retrieveData = async (key) => {
  var resultMap = {};
  try {

    for(i=0;i<key.length;i++){
      const value = await AsyncStorage.getItem(key[i]);
      resultMap[key[i]] = value;
    }

    return resultMap;
   } catch (error) {
     console.log(error);
   }
}
