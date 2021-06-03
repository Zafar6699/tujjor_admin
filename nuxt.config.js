export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    ssr: false,
    head: {
        title: "shop",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@assets/scss/colors.scss"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@plugins/v-mask.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        "@nuxtjs/fontawesome",
        [
            "@nuxtjs/moment",
            {
                defaultLocale: "uz-latn",
                locales: ["uz-latn", "ru"]
            }
        ],
        [
            "@nuxtjs/vuetify",
            {
                theme: {
                    themes: {
                        light: {
                            primary: "#F7931F",
                            secondary: "#b0bec5",
                            anchor: "#8c9eff"
                        }
                    }
                }
            }
        ]
    ],
    fontawesome: {
        component: "fa",
        icons: {
            solid: true,
            brands: true
        }
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "@nuxtjs/style-resources",
        "bootstrap-vue/nuxt"
    ],

    router: {
        middleware: ["auth"]
    },

    auth: {
        redirect: {
            login: "/auth/login",
            logout: "/auth/login",
            callback: "/auth/login",
            home: "/"
        },
        strategies: {
            local: {
                token: {
                    property: "token",
                    // required: true,
                    // type: 'Bearer'
                    name: "token"
                },
                user: {
                    property: "data"
                    // autoFetch: true
                },
                endpoints: {
                    login: { url: "/user/login", method: "post" },
                    user: { url: "/user/me", method: "get" }
                }
            }
        }
    },

    styleResources: {
        scss: ["@/assets/scss/*.scss"]
    },

    env: {
        uploads: "http://cdn.tujjor.org"
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: "http://cdn.tujjor.org/api", // Used as fallback if no runtime config is provided
        uploads: "http://cdn.tujjor.org"
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ["vuetify-mask"]
    }
};
