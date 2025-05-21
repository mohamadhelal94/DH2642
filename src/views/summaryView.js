/* Functional JSX component. Name starts with capital letter */
import { sortIngredients } from "../utilities.js";
function SummaryView(props) {
    function serachHachACB() {
        window.location.hash = "#search"
    }
    return (
        <div class="debug">
            Summary for <span title="nr guests">{props.people}</span> persons:
            <button style="float:right" onClick={serachHachACB}> search</button>
            {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                // Then we can come back to JSX <tags>

                /* TODO uncomment this at TW1.5, it won't work before because props.ingredinets is not set.
                    renderIngredients(props.ingredients, props.people) */
                renderIngredients(props.ingredients, props.people)


            }
        </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people) {
    function ingredientTableRowCB(ingr) {
        return <tr key={ingr.id}>
            <td>{ingr.name}</td>
            <td>{ingr.aisle}</td>
            <td class="alignRight">{(ingr.amount * people).toFixed(2)}</td>
            <td> {ingr.unit}</td>
        </tr>;
    }
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Aisle</th>
                <th>Quantity</th>
                <th>unit</th>
            </tr>
        </thead>
        <tbody>
            {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
                sortIngredients(ingredientArray).map(ingredientTableRowCB)
                // TODO sort the ingredients. Import the needed function from utilities.js 
            }
        </tbody>
    </table>;
}
export default SummaryView;
export { renderIngredients };   // we export so that tests can analyze the source code
