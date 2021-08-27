<template>
    <div>
        <nav :class="isMobile ? 'nav active-mobile-nav' : 'nav'">
            <div class="logo-shop">
                <nuxt-link to="/">
                    <div class="logo-shop__inner">
                        <!-- <fa icon="cubes"/> -->
                        <h1>TUJJOR-ADMIN</h1>
                    </div>
                </nuxt-link>
            </div>
            <div class="menu-nav">
                <ul class="menu-nav-ul">
                    <li v-for="(item, index) in menu" :key="index">
                        <nuxt-link
                            v-if="item.items == undefined"
                            :to="{ path: item.route }"
                            @click.native="toggleOne"
                        >
                            <fa class="left-icon" :icon="item.ricon" />
                            {{ item.title }}
                            <fa
                                :class="
                                    item.isOpen ? 'icon icon-rotate' : 'icon'
                                "
                                v-if="item.licon"
                                :icon="item.licon"
                            />
                        </nuxt-link>

                        <a v-else @click="toggleMenu(index)">
                            <fa class="left-icon" :icon="item.ricon" />
                            {{ item.title }}
                            <fa
                                :class="
                                    item.isOpen ? 'icon icon-rotate' : 'icon'
                                "
                                v-if="item.licon"
                                :icon="item.licon"
                            />
                        </a>

                        <ul
                            :class="
                                item.isOpen
                                    ? 'menu-accordion open'
                                    : 'menu-accordion'
                            "
                            v-if="item.items"
                        >
                            <li v-for="(i, j) in item.items" :key="j">
                                <nuxt-link :to="{ path: i.itemRoute }">{{
                                    i.itemTitle
                                }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div
            @click="isMobile = false"
            :class="isMobile ? 'fixvh active-mobile-vh' : 'fixvh'"
        ></div>
        <header class="header">
            <div class="header__inner">
                <div class="header-left" @click="isMobile = true">
                    <fa icon="bars" class="header__bars" />
                </div>
                <!-- <div class="header-right">
                <button type="button" class="header-profile">
                    <div class="profile-img">
                        <img src="@/assets/img/pro.png" alt="">
                    </div>
                    <h5>Zafar</h5>
                </button>
            </div> -->
                <div class="header-right">
                    <div class="profile-dropdown">
                        <button
                            v-click-outside="hide"
                            @click="toggleProfile"
                            type="button"
                            :class="
                                isDropdown
                                    ? 'bt-dropdown __active'
                                    : 'bt-dropdown'
                            "
                            data-target="profile-dropdown"
                        >
                            <div class="img-pro">
                                <img src="@/assets/img/pro.png" />
                            </div>
                            <h5>{{ $auth.user.name }}</h5>
                        </button>
                        <div
                            v-if="isDropdown"
                            class="dropdown-content my-dropdown"
                            id="profile-dropdown"
                        >
                            <nuxt-link to="/profile"
                                ><fa
                                    class="icon-profile"
                                    icon="user"
                                />Profile</nuxt-link
                            >
                            <nuxt-link to="/profile"
                                ><fa
                                    class="icon-profile"
                                    icon="credit-card"
                                />My Wallet</nuxt-link
                            >
                            <nuxt-link to="/profile"
                                ><fa
                                    class="icon-profile"
                                    icon="cog"
                                />Settings</nuxt-link
                            >
                            <hr />
                            <a
                                class="logout"
                                href="#"
                                @click="
                                    $auth.logout();
                                    $router.go();
                                "
                                ><fa
                                    class="icon-profile logout-icon"
                                    icon="power-off"
                                />Logout</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import Vue from "vue";

Vue.directive("click-outside", {
    bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
            // here I check that click was outside the el and his childrens
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    }
});
export default {
    data() {
        return {
            isDropdown: false,
            isMobile: false,
            menu: [
                {
                    route: "/",
                    ricon: "home",
                    title: "Главная"
                },

                {
                    route: "/category",
                    ricon: "list-ul",
                    title: "Категории"
                },
                {
                    route: "/shop",
                    ricon: "store-alt",
                    title: "Магазины"
                },

                {
                    route: "/users",
                    ricon: "users",
                    title: "Foydalanuvchilar"
                },
                {
                    route: "/brand",
                    ricon: "copyright",
                    title: "Бренды"
                },
                {
                    route: "/statistics",
                    ricon: "chart-line",
                    title: "Статистика"
                },
                {
                    route: "/chat",
                    ricon: "comments",
                    title: "Чат"
                },
                {
                    route: "/application",
                    ricon: "file-alt",
                    title: "Заявление"
                },
                {
                    route: "/application2",
                    ricon: "file-alt",
                    title: "Договор"
                },
                // {
                //     route: "/slider",
                //     ricon: "images",
                //     title: "Слайдер"
                // },
                {
                    ricon: "link",
                    title: " Управление",
                    licon: "chevron-down",
                    isOpen: false,
                    items: [
                        {
                            itemRoute: "/tag",
                            itemTitle: "Теги"
                        },
                        {
                            itemRoute: "/region",
                            itemTitle: "Областы"
                        },
                        {
                            itemRoute: "/slider",
                            itemTitle: "Слайдер"
                        },
                        {
                            itemRoute: "/banner",
                            itemTitle: "Баннеры"
                        },
                        {
                            itemRoute: "/info",
                            itemTitle: "Информация"
                        },
                        {
                            itemRoute: "/help",
                            itemTitle: "Помощь"
                        },
                        {
                            itemRoute: "/news",
                            itemTitle: "Новости"
                        }
                    ]
                },
                // {
                //     ricon: "users",
                //     title: "Foydalanuvchilar",
                //     licon: "chevron-down",
                //     isOpen: false,
                //     items: [
                //         {
                //             itemRoute: "/info",
                //             itemTitle: "Информация"
                //         },
                //         {
                //             itemRoute: "/help",
                //             itemTitle: "Помощь"
                //         },
                //         {
                //             itemRoute: "/news",
                //             itemTitle: "Новости"
                //         }
                //     ]
                // },
                {
                    ricon: "users",
                    title: "Foydalanuvchilar",
                    licon: "chevron-down",
                    isOpen: false,
                    items: [
                        {
                            itemRoute: "/adminlar",
                            itemTitle: "Adminlar"
                        },
                        {
                            itemRoute: "/adminlar",
                            itemTitle: "Adminlar"
                        },
                        {
                            itemRoute: "/adminlar",
                            itemTitle: "Adminlar"
                        }
                    ]
                }
            ]
        };
    },
    mounted() {
        this.menu.forEach(element => {
            console.log(element.items);
        });
    },
    methods: {
        toggleMenu(e) {
            // this.menu.forEach(element => {
            // 	element.isOpen = false;
            // });
            this.menu[e].isOpen = !this.menu[e].isOpen;
        },
        toggleOne() {
            this.isMobile = false;
        },
        toggleProfile() {
            this.isDropdown = !this.isDropdown;
        },
        hide() {
            this.isDropdown = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.toggle-enter-active,
.toggle-leave-active {
    transition: all 2s;
}
nav.nav {
    width: 240px;
    position: fixed;
    overflow: visible;
    top: 0;
    display: block;
    left: 0;
    min-height: 100vh;
    z-index: 15;
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.15);
    div.logo-shop {
        display: flex;
        justify-content: center;
        height: 60px;
        width: 100%;
        align-items: center;
        background-color: #f6f6f6;
        div.logo-shop__inner {
            display: flex;
            align-items: center;
            svg {
                font-size: 24px;
                path {
                    fill: $gc;
                }
            }
            h1 {
                font-size: 24px;
                color: $gc;
                margin-bottom: 0px;
                margin-left: 15px;
            }
        }
        a {
            display: flex;
            align-items: center;
        }
    }
    div.menu-nav {
        padding: 15px 10px;
        height: calc(100vh - 60px);
        overflow-y: scroll;
        padding-bottom: 60px !important;
    }
    div.menu-nav::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    div.menu-nav::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 5px;
    }

    /* Handle */
    div.menu-nav::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgb(184, 184, 184);
    }

    /* Handle on hover */
    div.menu-nav::-webkit-scrollbar-thumb:hover {
        background: rgb(136, 136, 136);
    }
    ul.menu-nav-ul {
        list-style-type: none;
        padding-left: 0px;
        margin-bottom: 0px;
        li {
            display: block;
            margin-bottom: 5px;
            .left-icon {
                margin-right: 10px;
                font-size: 16px;
                color: #5c6467;
                max-width: 20px;
                min-width: 20px;
            }
            .icon {
                font-size: 11px;
                float: right;
                margin-top: 5px;
            }
        }
        li > a {
            display: block;
            padding: 10px 15px;
            transition: 0.3s font-weight;
            color: #333;
            font-size: 14px;
            transition: 0.3s;
            font-weight: normal;

            border-radius: 10px;
            &:hover {
                color: $gc;
                background-color: #fff6eb;
                .left-icon {
                    color: $gc;
                }
            }
        }
        a.nuxt-link-exact-active {
            background-color: $gc !important;
            color: #fff !important;
            .left-icon {
                color: #fff !important;
            }
        }
    }
    ul.menu-accordion {
        // padding-left: 40px;
        // background-color: #f6f6f6;
        display: none;
        a {
            padding-left: 50px !important;
        }
    }
    ul.open {
        display: block;
    }
    .icon-rotate {
        transform: rotate(-180deg) !important;
    }
}
div.fixvh {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    display: none;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 90;
}
header.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 13;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.15);
    background-color: #fff;
    div.header__inner {
        margin-left: 240px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0px 20px;
        align-items: center;
        div.header-left {
            .header__bars {
                font-size: 22px;
                color: $gc;
                cursor: pointer;
            }
        }
        div.header-right {
            height: 100%;
            div.profile-dropdown {
                height: 100%;
                height: 100%;
                position: relative;
                h5 {
                    font-size: 18px;
                    font-weight: 500;
                    margin-bottom: 0px;
                    margin-left: 10px;
                }
                div.img-pro {
                    width: 38px;
                    height: 38px;
                    position: relative;
                    border-radius: 100%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                button {
                    padding: 5px 15px;
                    height: 100%;
                    border: none;
                    background: transparent;
                    display: flex;
                    align-items: center;
                }
                button.__active {
                    background-color: #eee;
                }
                div.dropdown-content {
                    position: absolute;
                    right: 0;
                    padding: 4px 0px;
                    width: 170px;
                    background-color: #fff;
                    z-index: 30;
                    display: block;
                    border-radius: 3px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    a {
                        display: block;
                        background-color: #ffffff;
                        padding: 0.5rem 1rem;
                        color: #212529;
                        font-size: 13px;
                        line-height: 20px;
                        i {
                            min-width: 20px;
                            font-size: 16px;
                        }
                        b {
                            font-weight: 400;
                            margin-left: 6px;
                        }
                        &:hover {
                            background-color: #f0f4f7;
                            color: #354558;
                        }
                    }
                    hr {
                        margin: 8px 0px;
                    }
                    .icon-profile {
                        margin-right: 10px;
                    }
                    a.logout {
                        .logout-icon {
                            color: #fc5454 !important;
                        }
                        color: #fc5454 !important;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    nav.nav {
        position: fixed;
        top: 0;
        // left: 0;
        z-index: 99;
        transform: translateX(-102%);
        transition: 0.5s;
    }
    div.header__inner {
        margin-left: 0px !important;
    }

    nav.active-mobile-nav {
        transform: translateX(0%);
    }

    div.active-mobile-vh {
        display: block;
    }
}
</style>
