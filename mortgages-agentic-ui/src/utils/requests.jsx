// import axios from "axios";

// // Helper to get your auth token (customize as needed)
// const getAuthToken = () => localStorage.getItem("authToken"); // or use cookies/context/etc

// /**
//  * Generic request function
//  * @param {Object} options
//  * @param {string} options.url - The API endpoint
//  * @param {string} options.method - HTTP method ('get'|'post'|'put' etc)
//  * @param {Object} [options.data] - Payload for POST/PUT
//  * @param {Object} [options.headers] - Custom headers
//  * @param {Object} [options.params] - Query params
//  * @param {Object} [options.other] - Any other Axios config
//  * @returns {Promise} Axios promise
//  */
// export const requests = async ({
//   url,
//   method = "get",
//   data,
//   headers = {},
//   params,
//   ...other // allows additional axios config
// }) => {
//   // Optionally get auth token (customize as needed)
//   const token = getAuthToken();
//   const finalHeaders = {
//     ...headers,
//     ...(token && { Authorization: `Bearer ${token}` }),
//   };

//   const config = {
//     url,
//     method,
//     headers: finalHeaders,
//     params,
//     ...other,
//   };

//   // Only add data for methods that support it
//   if (["post", "put", "patch", "delete"].includes(method.toLowerCase())) {
//     config.data = data;
//   }

//   try {
//     const response = await axios(config);
//     return response; // Or return response if you need headers/status
//   } catch (err) {
//     // Optional: handle error, rethrow, or return error object
//     throw err;
//   }
// };
import axios from "axios";
import { getDefaultStore } from 'jotai';
import { userStateAtom } from '../stores/atom'; // adjust path accordingly

export const requests = async ({
  url,
  method = "get",
  data,
  headers = {},
  params,
  ...other
}) => {
  const store = getDefaultStore();
  const user = store.get(userStateAtom);
  const token = user?.authToken ?? localStorage.getItem("authToken");

  console.log("Token ...."+token)

  const finalHeaders = {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    url,
    method,
    headers: finalHeaders,
    params,
    ...other,
  };

  if (["post", "put", "patch", "delete"].includes(method.toLowerCase())) {
    config.data = data;
  }

  console.log(config)

  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    throw err;
  }
};
