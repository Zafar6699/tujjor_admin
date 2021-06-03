export const state = () => ({
    count: 0,
    uploads: "http://cdn.tujjor.org"
});
export const mutations = {
    add(state, info) {
        state.count = 2;
    }
};
export const actions = {
    async deleteCategory({ commit, state }) {}
};
