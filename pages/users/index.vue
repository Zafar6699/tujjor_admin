<template>
    <div>
        <div class="data">
            <div class="list">
                <div class="btns">
                    <nuxt-link to="#" class="btn btn-sm btn-success">
                        Добавить
                    </nuxt-link>
                    <div @click="isFilter = !isFilter" :class="isFilter ? 'fix-vh' : ''">

                    </div>
                    <a to="#"  @click="openFilter">
                        Филтр
                    </a>
                </div>

                <table v-if="users != null">
                    <thead>
                    <tr class="head">
                        <th>Рол</th>
                        <th>Ф.И.О</th>
                        <th>Email</th>
                        <th>Телефон</th>
                        <th>Время регистрация</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item , index) of users">
                        <td>{{ item.role }}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.createdAt.slice(0,10) }}</td>
                        <td>
                            <button class="btn btn-sm btn-warning">
                                <fa
                                    icon="edit"
                                />
                        </button>
                            <button class="btn btn-sm btn-danger">
                                <fa
                                    icon="trash"
                                />
                            </button>
                        </td>
                    </tr>
                    </tbody>


                </table>
            </div>
            <div :class="isFilter ? 'filter close ' : 'filter'" >
               <h2>Filter</h2>
                <div class="form">
                    <p>Name</p>
                    <input type="text" placeholder="Name...">
                    <p>Name</p>
                    <input type="text" placeholder="Name...">

                    <button>Send</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    data(){
        return {
            isFilter : false,
            users: null
        }
    },
    async mounted(){
        const users = await this.$axios({
            method: "GET",
            url: '/user/all?page=1&limit=20',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        this.users = users.data.data
        console.log('users',users.data.data)
    },
    methods: {
      openFilter(){
          this.isFilter = !this.isFilter
      }
    }

}
</script>

<style lang="scss" scoped>
.fix-vh{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 100 ;
    top: 0;
    left: 0;
    background-color: rgba($color : #000, $alpha: 0.4) ;

}
.data{
    display: flex;
}
.list{
    width: 100%;
    background: #FFF;
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
    h2{
        margin-bottom: 15px;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        a{
            border-radius: 10px;
            padding: 10px;
            background: #246eb3;
            color: #fff;
            margin-left: 10px;
        }
    }
    table{
        width: 100%;
        thead{
            padding: 10px;
            background-color: #f8f9fa;
            th{
                padding: 15px;
            }
        }
        tbody{
            tr{
                td:first-child{
                    color: #111111;
                    font-weight: bold;
                }
            }
            tr{
                border-bottom: 1px solid #f1efef;
            }
            tr:last-child{
                border: 0;
            }
            td{
                padding: 10px;
            }
        }

    }
}
.close{
    top: 0;
    height: 100vh;
    z-index: 123;
    opacity: 1;
    transition: right .5s;
    position: fixed;
    //transform: translateX(400px);
    width: 30%;
    right: 0% !important;
    margin-left: 30px;
    background: #FFF;
    padding: 15px;
}
.filter{
    top: 0;
    height: 100vh;
    z-index: 123;
    opacity: 1;
    transition: right .5s;
    position: fixed;
    right: -50%;
    //transform: translateX(0);
    width: 30%;
    margin-left: 30px;
    background: #FFF;
    padding: 15px;

    &:hover{
        opacity: 1 !important;
    }
    h2{
        margin-bottom: 30px;
    }
    p{
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    input{
        width: 100%;
        border: 1px solid #dfe1e2;
        border-radius: 10px;
        padding: 10px;
        font-size: 15px;
        &:focus-visible{
            outline: none;
        }
        &::placeholder{
            font-size: 15px;
        }
    }
    button{
        color: #fff;
        font-size: 18px;
        margin-top: 20px;
        width: 100%;
        padding: 10px 0;
        border-radius: 10px;
        background: #246eb3;
    }
}

</style>
