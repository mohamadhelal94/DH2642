import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel.js";
import ResolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import App from "../views/app";

const VueRoot = { 
      // ordinary JS object literal, can have methods like render()
    data() {

        return {
            
            promiseState: {}
        }
    },  created() {
        const component = this;
        ResolvePromise(firebaseModelPromise(), component.promiseState, notifyACB);

        function notifyACB(){
            if (component.promiseState.data){
                updateFirebaseFromModel(component.promiseState.data);
                updateModelFromFirebase(component.promiseState.data);
            }

        }
    
      },
      render(){
        const component = this;
        return (<div>
                   {promiseNoData(component.promiseState) || <App model={component.promiseState.data} />};
                </div>);
            
       
    }
}
export default VueRoot;