export const state = () => ({
    isOpen: false,
    isEdit: false,
    data: null,
    dataEdit: null,
    categoryList: null,
    toggleConfirm: false,
    idCategory: null
});
export const mutations = {
    openModal(state, info) {
        state.isOpen = true;
        state.data = info;
    },
    openEdit(state, info) {
        state.isEdit = !state.isEdit;
        state.dataEdit = info;
    },
    closeModal(state) {
        state.isOpen = false;
    },
    getInfo(state, info) {
        state.categoryList = info;
    },

    isOpen(state) {
        state.toggleConfirm = !state.toggleConfirm;
    },
    idCategory(state, info) {
        state.idCategory = info;
    }
};
export const actions = {
    async getInfo({ commit }, url) {
        let p = await this.$axios.$get("/category/all");
        commit("getInfo", p.data);
    },

    async deleteCategory({ commit, state }) {
        await this.$axios
            .$delete("/category/" + state.idCategory)
            .then(async res => {
                let p = await this.$axios.$get("category/all");
                commit("isOpen");
                commit("getInfo", p.data);
            });
    }
};
