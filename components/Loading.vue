<template>
    <div>
        <div class="loading-center" v-if="isLoading">
            <div class="loading-inner">
                <atom-spinner
                    :animation-duration="1000"
                    :size="100"
                    :color="'#f7931f'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { AtomSpinner } from "epic-spinners";
export default {
    components: {
        AtomSpinner
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }
    }
};
</script>

<style></style>
