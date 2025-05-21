function DetailsView(props) {
    function ingredientsViewCB(ing) {
        return (<div><table>{ing.name} {ing.amount} {ing.unit}</table></div>);

    }
    return (
        <div>
            <img src={props.dishData.image}> </img>
            <div>
                <th>{props.dishData.title}</th><br></br>
                <th>Price:{props.dishData.pricePerServing}</th> <br></br>
                <th>For {props.guests} guests {(props.guests * props.dishData.pricePerServing).toFixed(2)}</th>
            </div>
            <br></br>
            <div>

                {props.dishData.extendedIngredients.map(ingredientsViewCB)}
            </div>
            <br></br>
            <div> {props.dishData.instructions}</div>
            <div><a href={props.dishData.sourceUrl}> More information!</a></div>
            <div style="float:right">
                <button class="button" disabled={props.isDishInMenu} onClick={function addDishACB() {
                    props.addDish();
                    window.location.hash = "#search";
                }}>Add to menu!</button>
                <button class="button" onClick={function cancelACB() { window.location.hash = "#search"; }}> Cancel!</button>
            </div>
        </div>

    );
}
export default DetailsView;