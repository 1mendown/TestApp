import _ from "lodash";
import rest from "./LisOfRestaurants";

  export const contains = ( {resName},query) => {
   
  if (resName.includes(query)) {
    return true;
  }

  return false;
};

export const getResList = (limit = 100, query = "") => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(rest, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(rest, LisOfRestaurants => {
        return contains(LisOfRestaurants, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getResList;