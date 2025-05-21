import SearchResultsView from "../views/searchResultsView";
import SearchFormView from "../views/searchFormView.js";
import promiseNoData from "../views/promiseNoData";
import { searchDishes} from "../dishSource";
import ResolvePromise from "../resolvePromise";
const Search = {   // ordinary JS object literal, can have methods like render()
  props: ["model"],
  data() { return {query:"", type:"",promiseState:{}} },
  created() {
    const component = this;
    ResolvePromise(searchDishes({query: component.query, type: component.type}),
    component.promiseState);

  },
  render() {
    const component = this;
    /* re-use the TW2 functional component code, but replace props with component! */
    function searchFromMenuACB() {
      //component.model.doSearch({query: component.query, type: component.type})
      ResolvePromise(searchDishes({query: component.query, type: component.type}),component.promiseState);
    }
    function textSearchMenuACB(query) {
      component.query=query;
      
    }
  
    function typeSearchMenuACB(type) {
      component.type=type;
    }
    function onClickACB(res) {
      component.model.setCurrentDish(res.id)
     } 
     return (
      <div>
          <SearchFormView
              dishTypeOptions={["starter", "main course", "dessert"]}
              searchFromMenu={searchFromMenuACB}
              searchText={textSearchMenuACB}
              searchType={typeSearchMenuACB}
          />
  
          { promiseNoData(this.promiseState)|| 
          <SearchResultsView onResultClick={onClickACB} 
          searchResults={this.promiseState.data} />}
      </div>
  );
  },

  
};
export default Search;

/*
export default function searchPresenter(props) {
    
if (!props.model.searchResultsPromiseState.promise ){
    props.model.doSearch(props.model.searchParams);
}
function searchFromMenuACB() {
    props.model.doSearch(props.model.searchParams);
  }
  
  function textSearchMenuACB(text) {
    props.model.setSearchQuery(text);
  }

  function typeSearchMenuACB(type) {
    props.model.setSearchType(type);
  }

  function onClickACB(res) {
    props.model.setCurrentDish(res.id)
   }  
return (
    <div>
        <SearchFormView
            dishTypeOptions={["starter", "main course", "dessert"]}
            searchFromMenu={searchFromMenuACB}
            searchText={textSearchMenuACB}
            searchType={typeSearchMenuACB}
        />

        { promiseNoData(props.model.searchResultsPromiseState)|| <SearchResultsView onResultClick={onClickACB} searchResults={props.model.searchResultsPromiseState.data} />}
    </div>
);

}*/