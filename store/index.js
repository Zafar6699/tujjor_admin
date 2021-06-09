export const state = () => ({
    count: 0,
    uploads: "http://cdn.tujjor.org",
    categoryBrand: {}
});
export const mutations = {
    add(state, info) {
        state.count = 2;
    },
    CATEGORY_BRAND(state, item) {
        state.categoryBrand = item;
    }
};
export const actions = {
    async deleteCategory({ commit, state }) {}
};
