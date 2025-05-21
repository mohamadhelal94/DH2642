import {dishType} from "../utilities.js";
import {sortDishes} from "../utilities.js";
import {menuPrice} from "../utilities.js";
function SidebarView(props) {
    
    function eventMinusButtonACB(e) { props.onNumberChange(props.number - 1); eventPrinterACB("minus button clicked"); }
    function eventPlusButtonACB(e) { props.onNumberChange(props.number + 1); eventPrinterACB("plus button clicked"); }
    function eventPrinterACB(e) { console.log(e) }

    return (
        <div>
            <button disabled={props.number === 1} onClick={eventMinusButtonACB}>-</button>
            <span>{props.number}</span>
            <button onClick={eventPlusButtonACB}>+</button>

            {renderDishes(props.dishes, props.number, props)}
            
        </div>

    );
}

function renderDishes(dishArray, number,props) {
    function dishesTableRowCB(dish) {
        function removeDishACB(){
            props.dishRemove(dish);
        }
        function updateDishACB(){
            props.dishUpdate(dish);
        }

       

        

        return (
            <tr key={dish.id}>
                <td>
                    <button onClick={removeDishACB}>X</button>
                </td>
                <td>
                    <a onClick = {updateDishACB} href="#details" >{dish.title}</a>
                </td>

                <td>
                    {dishType(dish)}
                </td>
                <td class="alignRight">
                    {(dish.pricePerServing *number).toFixed(2)}
                </td>
            </tr>
        );
    }

    return (<table>
        <tbody>
            {  
                sortDishes(dishArray).map(dishesTableRowCB)
            }
       
        <tr>
            <td >
            </td>
            <td >
                total:
            </td>
            <td >
               
            </td>
            <td class="alignRight">
                {(menuPrice(dishArray)*number).toFixed(2)}
            </td>
        </tr>
        </tbody>
    </table>);

}
export default SidebarView;
export { renderDishes };   // we export so that tests can analyze the source code
