export const state = () => ({
    isOpen: false,
    id: null,
    url: "",
    data: []
});
export const mutations = {
    openModal(state, info) {
        state.id = info.id;
        state.url = info.url;
        state.isOpen = true;
    },
    closeModal(state) {
        state.isOpen = false;
    },
    getInfo(state, data) {
        state.data = data;
    }
};
export const actions = {
    async getInfo({ commit }, url) {
        let p = await this.$axios.$get(url);
        commit("getInfo", p);
    },

    async deleteInfo({ commit, state }) {
        await this.$axios
            .$delete(state.url + "/" + state.id)
            .then(async res => {
                console.log(res);

                let p = await this.$axios.$get(state.url);
                commit("closeModal");
                commit("getInfo", p);
            });
    }
};
