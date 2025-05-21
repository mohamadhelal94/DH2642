import firebaseConfig from "/src/firebaseConfig.js";
import { getDishDetails } from "./dishSource.js";
import DinnerModel from "./DinnerModel.js";
firebase.initializeApp(firebaseConfig);

const REF = "dinnerModel81";

// Add relevant imports here 
// TODO

// Initialise firebase
// TODO

function observerRecap(model) {
    function printpayloadCB(payload) {
        console.log(payload);
    }
    model.addObserver(printpayloadCB);
    //TODO
}

function firebaseModelPromise() {



    function makeBigPromiseACB(firebaseData) {

        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }

        const array = firebaseData.val()?.addDish ?? [];
        const guests = firebaseData.val()?.numberOfGuests ?? 2;

        function createModelACB(dishArray) {
            return new DinnerModel(guests, dishArray);
        }

        const dishPromiseArray = Object.keys(array).map(makeDishPromiseCB);
        return Promise.all(dishPromiseArray).then(createModelACB)
    }

    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function checkPayloadCB(payload) {

        if (payload !== undefined && payload.guests !== undefined) {
            firebase.database().ref(REF + "/numberOfGuests").set(model.numberOfGuests);

        } if (payload !== undefined && payload.currentDish !== undefined) {
            firebase.database().ref(REF + "/currentDish").set(model.currentDish);

        } if (payload !== undefined && payload.addDish !== undefined) {
            firebase.database().ref(REF + "/addDish/" + payload.addDish.id).set(payload.addDish);

        } if (payload !== undefined && payload.removeDish !== undefined) {
            firebase.database().ref(REF + "/addDish/" + payload.removeDish.id).set(null);
        }
    }
    model.addObserver(checkPayloadCB);
}

function updateModelFromFirebase(model) {
    function checkDishId(dishes, currentId) {
        const id = dishes.filter(function checkIfDishExistCB(dish) {
            if (dish.id === currentId) {
                return true;
            } else {
                return false;
            }
        })
        if (id[0] === undefined) {
            return false;
        } else {
            return true;
        }
    }
    firebase.database().ref(REF + "/numberOfGuests")
        .on("value", function guestsChangedInFirebaseACB(firebaseData) {
            model.setNumberOfGuests(firebaseData.val());
        });
    firebase.database().ref(REF + "/currentDish")
        .on("value", function currentDishInFirebaseACB(firebaseData) {
            model.setCurrentDish(firebaseData.val());
        });
    firebase.database().ref(REF + "/addDish")
        .on("child_added", function addChildACB(data) {
            if (!checkDishId(model.dishes, +data.key)) {
                getDishDetails(+data.key).then(function suitableCallbackName(dish) {
                    model.addToMenu(dish);
                }
                );
            }
        });
    firebase.database().ref(REF + "/addDish")
        .on("child_removed", function removeACB(data) {
            if (checkDishId(model.dishes, +data.key)) {
                model.removeFromMenu({ id: +data.key });
            }
        });

}


// Remember to uncomment the following line:
export { observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase };