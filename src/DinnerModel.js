/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
import ResolvePromise from "./resolvePromise";
import { searchDishes, getDishDetails } from "./dishSource";

class DinnerModel {

    constructor(nrGuests = 2, dishArray = [], currentDish) {
        this.observers = [];
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState = {};
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;
    }
    /*TW3.1 DinnerModel as Observable*/
    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        function checkCallbackCB(check) { return callback !== check }
        this.observers = this.observers.filter(checkCallbackCB);
    }

    notifyObservers(payload) {
        this.observers.forEach(function invokeObserverCB(obs) {
            try {
                obs(payload);
            } catch (err) {
                console.error(err);
            }
        });
    }
    /*__________________________________________________________________________ */

    setNumberOfGuests(nr) {
        if (nr !== this.numberOfGuests) {
            if (nr > 0 && Number.isInteger(nr)) {
                this.numberOfGuests = nr;
                this.notifyObservers({ guests: nr });
            }
            else {
                throw "number of guests not a positive integer";
            }
        }
    }


    addToMenu(dishToAdd) {
        if (!evaluateDshId(this.dishes, dishToAdd.id)) {
            this.dishes = [...this.dishes, dishToAdd];
            this.notifyObservers({ addDish: dishToAdd });
        }

    }


    removeFromMenu(dishToRemove) {
        function hasSameIdCB(dish) {

            if (dish.id === dishToRemove.id) {
                return false;
            } else {
                return true;
            }
        }
        if (evaluateDshId(this.dishes, dishToRemove.id)) {
            this.dishes = this.dishes.filter(hasSameIdCB);
            this.notifyObservers({ removeDish: dishToRemove });
        }
    }


    setCurrentDish(id) {
        if (id !== undefined && this.currentDish !== id) {
            this.currentDish = id;
            const model = this;
            function notifyACB() {
                model.notifyObservers();
            }
            ResolvePromise(getDishDetails(this.currentDish), this.currentDishPromiseState, notifyACB);
            model.notifyObservers({ currentDish: id });
        }
    }


    setSearchQuery(q) {
        this.searchParams.query = q;
        this.notifyObservers({ searchType: q });
    }


    setSearchType(t) {
        this.searchParams.type = t;
        this.notifyObservers({ searchType: t });
    }


    doSearch(params) {
        this.searchParams = params;
        const model = this;
        function notifyACB() {
            model.notifyObservers();
        }
        ResolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState, notifyACB);
    }

}
function evaluateDshId(dishes, currentId) {
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
export default DinnerModel;

