<template>
    <div>
        <v-dialog
            v-model="isOpen"
            width="420"
            @click:outside="$emit('deleteClose')"
        >
            <v-card>
                <v-card-title class="headline">
                    Ma`lumotni o'chirmoqchimisiz?
                </v-card-title>
                <v-card-text class="d-flex justify-content-center">
                    <fa class="danger-delete" icon="exclamation-triangle" />
                </v-card-text>
                <v-card-text>
                    Ma`lumot o'chirilgandan keyin uni qayta tiklash imloni yo'q
                </v-card-text>

                <v-card-actions>
                    <input type="hidden" />
                    <input type="hidden" />
                    <v-spacer></v-spacer>
                    <v-btn
                        color="teal"
                        @click="$emit('deleteRequest', id)"
                        depressed
                        outlined
                        text
                    >
                        Ha
                    </v-btn>
                    <v-btn
                        color="error"
                        @click="$emit('deleteClose')"
                        depressed
                        outlined
                        text
                    >
                        Yo'q
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean
        },
        id: {
            type: String
        }
    }
};
</script>

<style></style>
