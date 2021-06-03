export const state = () => ({
    isOpen: false,
    data: [],
    url: "",
    id: ""
});
export const mutations = {
    TOGGLE_OPEN(state, data) {
        state.isOpen = !state.isOpen;
        state.url = data.url;
        state.id = data.id;
    },
    CHANGE_DATA(state, data) {
        state.data = data;
    }
};
export const actions = {
    async getData({ commit, state }, url) {
        let data = await this.$axios.$get("/" + url + "/all");
        commit("CHANGE_DATA", data.data);
    },
    async deleteInfo({ commit, state }) {
        await this.$axios
            .$delete("/" + state.url + "/" + state.id)
            .then(async res => {
                let data = await this.$axios.$get("/" + state.url + "/all");
                commit("CHANGE_DATA", data.data);
                commit("TOGGLE_OPEN", {
                    url: "",
                    id: ""
                });
            });
    },
    async changeStatus({ commit }, data) {
        await this.$axios
            .$put("/" + data.url + "/" + data.item._id, {
                status: item.status
            })
            .then(async res => {
                let data = await this.$axios.$get("/" + state.url + "/all");
                commit("CHANGE_DATA", data.data);
            });
    }
};
