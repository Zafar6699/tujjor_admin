<template>
    <header class="header">
        <div class="header__inner">
            <div class="header-left">
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
                            isDropdown ? 'bt-dropdown __active' : 'bt-dropdown'
                        "
                        data-target="profile-dropdown"
                    >
                        <div class="img-pro">
                            <img src="@/assets/img/pro.png" />
                        </div>
                        <h5>Zafar</h5>
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
                            ><fa class="icon-profile" icon="credit-card" />My
                            Wallet</nuxt-link
                        >
                        <nuxt-link to="/profile"
                            ><fa
                                class="icon-profile"
                                icon="cog"
                            />Settings</nuxt-link
                        >
                        <hr />
                        <a class="logout" href="#"
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
            isDropdown: false
        };
    },

    methods: {
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
</style>
