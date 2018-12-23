import _ from "lodash";
import List from "./List";

export const contains = ({ name, address, phone_number }, query) => {
  //const { first, last } = name;
  if (name.toLowerCase().includes(query) || address.toLowerCase().includes(query) || phone_number.toLowerCase().includes(query)) {
    return true;
  }

  return false;
};

// export const SearchList = (limit = 70, query = "") => {
//   return new Promise((resolve, reject) => {
//     if (query.length === 0) {
//       resolve(_.take(List, limit));
//     } else {
//       const formattedQuery = query.toLowerCase();
//       const results = _.filter(List, user => {
//         return contains(user, formattedQuery);
//       });
//       resolve(_.take(results, limit));
//     }
//   });
// };

//export default SearchList;
