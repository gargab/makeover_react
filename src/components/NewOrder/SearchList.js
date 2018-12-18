import _ from "lodash";
import List from "./List";

export const contains = ({ name, email }, query) => {
  const { first, last } = name;
  if (first.includes(query) || last.includes(query) || email.includes(query)) {
    return true;
  }

  return false;
};

export const SearchList = (limit = 70, query = "") => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(List, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(List, user => {
        return contains(user, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default SearchList;
