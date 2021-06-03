<template>
    <div class="login-page">
        <div class="login-page-box">
            <h3>TUJJOR</h3>
            <h1>Login</h1>

            <form @submit.prevent="userLogin">
                <v-text-field
                    label="Telefon nomer"
                    :rules="[rules.required]"
                    outlined
                    v-model="user.phone"
                    placeholder="+998 (__) ___ -__-__"
                    v-mask="'+998 (##) ###-##-##'"
                    dense
                ></v-text-field>

                <v-text-field
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show ? 'text' : 'password'"
                    label="Parol"
                    @click:append="show = !show"
                    dense
                    outlined
                ></v-text-field>

                <button>Kirish</button>
            </form>
            <h6>Login va parol yo'q bo'lsa ariza qoldiring</h6>
            <nuxt-link class="to-register" to="/auth/register"
                >Ariza qoldirish</nuxt-link
            >
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",
    data() {
        return {
            show: false,
            rules: {
                required: value => !!value || "To'ldirilishi shart",

                emailMatch: () =>
                    `The email and password you entered don't match`
            },
            user: {
                phone: "",
                password: ""
            }
        };
    },
    methods: {
        async userLogin() {
            let phone = this.user.phone.replace(/[^0-9]/g, "");
            console.log(phone);
            try {
                let response = await this.$auth.loginWith("local", {
                    data: {
                        phone: phone,
                        password: this.user.password
                    }
                });
                this.$router.push("/");
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
div.login-page {
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 247, 220);
    display: flex;
    align-items: center;
    justify-content: center;
    div.login-page-box {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.3);
        padding: 15px 20px;
        h6 {
            font-size: 13px;
            color: #666;
            font-weight: 400;
            margin-top: 15px;
            margin-bottom: 5px;
        }
        .to-register {
            width: 100%;
            padding: 7px 15px;
            border: none;
            background-color: #fff;
            color: $gc;
            display: flex;
            justify-content: center;
            border-radius: 5px;
            font-weight: 600;
            font-size: 18px;
            margin-top: 0px;
            border: 1px solid $gc;
            &:hover {
                color: $gc;
            }
        }
        h3 {
            font-size: 36px;
            margin-bottom: 10px;
            color: $gc;
            text-align: center;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 25px;
            color: #333;
            text-align: center;
        }
        div.form-group {
            margin-bottom: 15px;
            h2 {
                font-size: 16px;
                color: #333;
                margin-bottom: 5px;
            }
            input {
                border: 1px solid #999;
                height: 35px;
                font-size: 14px;
                border-radius: 3px;
                width: 100%;
                padding-left: 10px;
                font-weight: 500;
                &:focus {
                    outline: none;
                    border: 1px solid #333;
                }
            }
        }
        button {
            width: 100%;
            padding: 7px 15px;
            background-color: $gc;
            color: #fff;
            border: 1px solid $gc;
            border-radius: 5px;
            font-weight: 600;
            font-size: 18px;
            margin-top: 10px;
            &:hover {
                background-color: #ec932c;
            }
        }
    }
}
</style>
