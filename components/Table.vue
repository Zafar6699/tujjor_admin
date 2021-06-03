<template>
    <div>
        <div class="data-table">
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Izlash"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="header"
                :items="data"
                :search="search"
                :footer-props="{
                    'items-per-page-text': ''
                }"
            >
                <template v-slot:item.status="{ item }">
                    <v-chip
                        v-if="item.status == 1"
                        color="green"
                        x-small
                        pill
                        text-color="white"
                        >Active
                    </v-chip>
                    <v-chip
                        v-if="item.status == 0"
                        color="red"
                        x-small
                        pill
                        text-color="white"
                        >Inactive</v-chip
                    >
                </template>

                <template v-slot:item.createdAt="{ item }">
                    <td class="text-start">
                        {{ $moment(item.createdAt).format("DD-MM-YY HH:mm") }}
                    </td>
                </template>

                <template v-slot:item.switch="{ item }">
                    <v-switch
                        v-model="item.status"
                        @change="$emit('changeStatus', item)"
                    ></v-switch>
                </template>

                <template v-slot:item.image="{ item }">
                    <div class="table-image" v-if="type == 'shop'">
                        <img :src="$store.state.uploads + item.image" alt="" />
                    </div>
                </template>

                <template v-slot:item.actions="{ item }">
                    <div class="table-actions">
                        <nuxt-link
                            v-if="type == 'shop'"
                            type="button"
                            :to="{
                                name: type + '-info-id',
                                query: { slug: item.slug, id: item._id }
                            }"
                            class="__eye"
                        >
                            <fa class="eye-icon" icon="eye" />
                        </nuxt-link>
                        <nuxt-link
                            v-if="
                                type == 'shop' ||
                                    type == 'info' ||
                                    type == 'news' ||
                                    type == 'help'
                            "
                            :to="{
                                name: type + '-edit-id',
                                query: { slug: item.slug, id: item._id }
                            }"
                            class="__edit"
                        >
                            <fa class="edit-icon" icon="edit" />
                        </nuxt-link>
                        <button
                            type="button"
                            class="__delete"
                            @click="$emit('deleteOpen', item._id)"
                        >
                            <fa class="delete-icon" icon="trash" />
                        </button>
                    </div>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: {
            type: Array
        },
        data: {
            type: Array
        },
        type: {
            type: String
        },
        actions: {
            type: Object
        }
    },
    data() {
        return {
            search: ""
        };
    }

    // methods: {
    //     deleteOpen(id, url) {
    //         this.$store.commit("getdelete/TOGGLE_OPEN", {
    //             id,
    //             url
    //         });
    //     },
    //     changeStatus(item) {
    //         alert("ok");
    //         this.$store.dispatch("getdelete/changeStatus", {
    //             item,
    //             url: this.type
    //         });
    //     }
    // }
};
</script>

<style></style>
