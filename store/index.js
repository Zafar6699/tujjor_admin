export const state = () => ({
    isLoading: false,
    uploads: "http://cdn.tujjor.org/",
    categoryBrand: {}
});
export const mutations = {
    CHANGE_LOADING(state) {
        state.isLoading = !state.isLoading;
    },
    CATEGORY_BRAND(state, info) {
        state.categoryBrand = info;
    }
};
export const actions = {};
