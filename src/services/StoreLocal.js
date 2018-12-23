import {AsyncStorage} from "react-native"

export const storeData = async (keyValuePair) => {
   try {

    for(key in keyValuePair){
      await AsyncStorage.setItem(key, keyValuePair[key]);
    }

  } catch (error) {
    console.log(error);
  }
}
