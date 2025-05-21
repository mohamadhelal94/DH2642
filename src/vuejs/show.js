const Show = {
    props: ["hash"],
    data() { return { hashState: window.location.hash } },


    created() {
        const component = this;
        function listnerHashACB(e) {
            component.hashState = window.location.hash
        }
        window.addEventListener("hashchange", listnerHashACB)
        this.listenerHash = listnerHashACB;
    },
    unmounted() {
        window.removeEventListener("hashchange", this.listenerHash)
    },
    render() {
        const component = this;
        if (this.hash !== this.hashState) {
            return false;
        }
        else {
            return <div>{this.$slots.default()}</div>
        }
    },


}





















export default Show;