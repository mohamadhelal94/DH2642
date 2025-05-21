export { getDishDetails, searchDishes };
import { BASE_URL, API_KEY } from "/src/apiConfig.js";

function treatHTTPResponseACB(response) {
    /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
    if (response.status !== 200) {
        throw "API problem";
    } else {
        return response.json();

    }
}

 function getDishDetails(params) {
    const endpoint = "recipes/";
    return fetch(BASE_URL + endpoint + params.toString() + "/information", {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
            'X-Mashape-Key': API_KEY,
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        } // end of headers object
    }/* end of second fetch parameter, object */
    )
        .then(treatHTTPResponseACB);



}
function searchDishes(params) {
    const endpoint = "recipes/search?";
    
    function transformResultACB(object) {
        // i changed here to return the object with property results
        return object.results;
       }

    return fetch(BASE_URL + endpoint+ new URLSearchParams(params), {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
            'X-Mashape-Key': API_KEY,
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        } // end of headers object
    }/* end of second fetch parameter, object */
    )
        .then(treatHTTPResponseACB)
        .then(transformResultACB);

    /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
}