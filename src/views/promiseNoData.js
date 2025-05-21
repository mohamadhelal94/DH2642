function promiseNoData(promiseState) {
    if (!promiseState.promise) {
        return (<div>No data</div>);
    }else{
        if ((!promiseState.data) && (!promiseState.error)){
            return (<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />);
        }
        if ((!promiseState.data) && (promiseState.error)){
            return (<div >{promiseState.error["error"]}</div>);
        }
        if ((promiseState.data) && (!promiseState.error)){
            return (false);
        }
    }



}
export default promiseNoData;