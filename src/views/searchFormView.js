function SearchFormView(props) {
    function optionCB(Opt) {
        return <option>{Opt}</option>

    }
function printerSearchTextACB(somEvent){
    console.log(somEvent.target.value); 
    props.searchText(somEvent.target.value);
}
    function printerSearchTypeACB(somEvent){
        console.log(somEvent.target.value);
        props.searchType(somEvent.target.value); 
    }
    function printerSearchOnClick(){
        //console.log(somEvent.target.value);
        props.searchFromMenu();

    }
    return (
        <div>
            <input placeholder="Search" type="search" onChange= {printerSearchTextACB}></input>
            

            <select onChange={printerSearchTypeACB}>
                <option>Choose:</option>
                {props.dishTypeOptions.map(optionCB)}

            </select>
            <button onClick={printerSearchOnClick}>Search!</button>
            
        </div>
    );
    
}

export default SearchFormView;
