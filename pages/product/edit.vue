<template>
    <div>
        <div class="page-title-box">
            <h2>Продукты</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Добавить продукты</h4>
            </div>

            <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step
                :complete="step > 1"
                step="1"
                @click="step = 1"
                >
                
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step
                :complete="step > 2"
                step="2"
                @click="step = 2"
                >
               
                </v-stepper-step>
        
                <v-divider></v-divider>
        
                <v-stepper-step step="3" @click="step = 3">
               
                </v-stepper-step>
            </v-stepper-header>
        
            <v-stepper-items>
                <v-stepper-content step="1">
                <v-card>
                    <div class="row">
                        <div class="col-md-4">

                            <v-text-field
                                label="Mahsulot nomi"
                                :rules="validate"
                                outlined
                                dense
                            ></v-text-field>
                            
                            <v-file-input
                                dense
                                multiple
                                outlined
                                accept="image/png, image/jpeg, image/bmp"
                                prepend-icon="mdi-camera"
                                label="Mahsulot uchun rasmlarni tanlang"
                            ></v-file-input>

                        </div>
                        <div class="col-md-4">2</div>
                        <div class="col-md-4">3</div>

                    </div>
                </v-card>


                <div class="d-flex justify-content-end">
                    <v-btn
                        color="primary"
                        @click="step = 2"
                    >
                        Keyingi
                    </v-btn>
                </div>
        
                
                </v-stepper-content>
        
                <v-stepper-content step="2">
                <v-card>
                    <div class="row">
                        <div class="col-md-4">

                            <v-text-field
                                label="Mahsulot nomi"
                                :rules="validate"
                                outlined
                                dense
                            ></v-text-field>
                            
                            <v-file-input
                                dense
                                multiple
                                outlined
                                accept="image/png, image/jpeg, image/bmp"
                                prepend-icon="mdi-camera"
                                label="Mahsulot uchun rasmlarni tanlang"
                            ></v-file-input>

                        </div>
                        <div class="col-md-4">2</div>
                        <div class="col-md-4">3</div>

                    </div>
                </v-card>

                <div class="d-flex justify-content-end">
                    <v-btn 
                        color="primary"
                        @click="step = 1"
                        outlined
                        class="mr-3"
                    >
                        Orqaga
                    </v-btn>

                    <v-btn
                        color="primary"
                        @click="step = 3"
                    >
                        Keyingi
                    </v-btn>
                </div>
        
                
                </v-stepper-content>
        
                <v-stepper-content step="3">
                <v-card>
                    <div class="row">
                        <div class="col-md-4">

                            <v-text-field
                                label="Mahsulot nomi"
                                :rules="validate"
                                outlined
                                dense
                            ></v-text-field>
                            
                            <v-file-input
                                dense
                                multiple
                                outlined
                                accept="image/png, image/jpeg, image/bmp"
                                prepend-icon="mdi-camera"
                                label="Mahsulot uchun rasmlarni tanlang"
                            ></v-file-input>

                        </div>
                        <div class="col-md-4">2</div>
                        <div class="col-md-4">3</div>

                    </div>
                </v-card>
            
                <div class="d-flex justify-content-end">
                    <v-btn 
                        color="primary"
                        @click="step = 2"
                        outlined
                        class="mr-3"
                    >
                        Orqaga
                    </v-btn>

                    <v-btn
                        color="primary"
                
                    >
                        Saqlash
                    </v-btn>
                </div>
                
                </v-stepper-content>
            </v-stepper-items>
            </v-stepper>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            validate: [
                value => !!value || 'To\'ldirilishi shart !!!',
            ],
            step: 1,
        }
    }
}
</script>

<style>

</style>