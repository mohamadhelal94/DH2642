import DetailsView from "../views/detailsView.js";
import PromiseNoData from "../views/promiseNoData.js";

function detailsPresenter(props) {

    function dishChesckInformationIdACB(dishes, currentId) {
        function dishExitsCB(dish) {
            if (dish.id === currentId) {
                return true;
            } else {
                return false;
            }

        }
        let id = dishes.filter(dishExitsCB)
        if (id[0] === undefined) {
            return false;
        } else {
            return true;
        }

    }

    return (PromiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data}

        isDishInMenu={dishChesckInformationIdACB(props.model.dishes, props.model.currentDish)}
        guests={props.model.numberOfGuests}
        addDish={function addDishACB() { props.model.addToMenu(props.model.currentDishPromiseState.data); }} />);





}

export default detailsPresenter;