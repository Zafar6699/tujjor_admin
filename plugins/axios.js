export default function({ $axios, store, redirect }) {
    $axios.onRequest(config => {
        store.commit("CHANGE_LOADING");
    });

    $axios.onResponse(res => {
        store.commit("CHANGE_LOADING");
    });
}
