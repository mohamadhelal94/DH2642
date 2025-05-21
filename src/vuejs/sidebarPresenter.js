import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props){
    function passChangedNumberModelACB(pre){
        
        return props.model.setNumberOfGuests(pre);
    }
    function removeDishACB(dish){ 
        props.model.removeFromMenu(dish);
    }
    function updateDishACB(id){ 
        props.model.setCurrentDish(id)
    }
    
    return <SidebarView onNumberChange={passChangedNumberModelACB}  number={props.model.numberOfGuests} dishes={props.model.dishes} dishRemove = {removeDishACB}
    dishUpdate = {updateDishACB} />;
}