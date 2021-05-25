<template>
    <nav class="nav">
        <div class="logo-shop">
            <nuxt-link to="/">
                <div class="logo-shop__inner">
                    <!-- <fa icon="cubes"/> -->
                    <h1>TUJJOR-SHOP</h1>
                </div>
            </nuxt-link>
        </div>
        <div class="menu-nav">
            <ul class="menu-nav-ul">
                <li v-for="(item, index) in menu" :key="index">
                    <nuxt-link
                        :to="{ path: item.route }"
                        @click.native="toggleMenu(index)"
                    >
                        <fa class="left-icon" :icon="item.ricon" />
                        {{ item.title }}
                        <fa
                            :class="item.isOpen ? 'icon icon-rotate' : 'icon'"
                            v-if="item.licon"
                            :icon="item.licon"
                        />
                    </nuxt-link>

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
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    route: "/",
                    ricon: "home",
                    title: "Главная"
                },
                {
                    route: "/product",
                    ricon: "cube",
                    title: "Продукты"
                },
                {
                    route: "/shops",
                    ricon: "store-alt",
                    title: "Магазины"
                },
                {
                    route: "/order",
                    ricon: "shopping-cart",
                    title: "Заказы"
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
                },
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
                },
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
    methods: {
        toggleMenu(e) {
            // this.menu.forEach(element => {
            // 	element.isOpen = false;
            // });
            this.menu[e].isOpen = !this.menu[e].isOpen;
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
    }
    ul.menu-nav-ul {
        list-style-type: none;
        padding-left: 0px;
        margin-bottom: 0px;
        li {
            display: block;
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
</style>
