/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;
const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Details = require("../"+PREFIX+"/detailsPresenter.js").default;
const Search = require("../"+PREFIX+"/searchPresenter.js").default;
const Show = require("../" + PREFIX + "/show.js").default; 

export default
function App(props){
    /*we have mistake here because we forget to add this two lines
    const Details = require("../"+PREFIX+"/detailsPresenter.js").default;
const Search = require("../"+PREFIX+"/searchPresenter.js").default;

                    <div><Search model={props.model} /></div>
                <div><Details model={props.model} /></div>
    */ 
    return (<div class="flexParent">
                {<div class="sidebar"><Sidebar model={props.model} /></div>}
                <div class="mainContent"><Summary model={props.model} /></div>
                <Show hash="#search"><Search model={props.model} /></Show>
                <Show hash="#details"><Details model={props.model} /></Show>
                
            </div>
           );
}
