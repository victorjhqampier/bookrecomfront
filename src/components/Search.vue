<template>
<h1>{{request}}</h1>
<div class="col-12 col-sm-12" v-for="libro in books" v-bind:key="libro">
                    <div class="card mb-2">
                        <div class="row g-0">
                            <div class="col-md-2 text-center p-2">
                                <img :src="libro.image" class="img-fluid bg-secondary thumb-post-img rounded shadow" :alt="libro.title" />
                            </div>
                            <div class="col-md-10">
                                <div class="card-body p-2">
                                    <h5 class="card-title text-white mb-0">{{libro.title.toUpperCase() + '. '+libro.subtitle.toUpperCase()}}</h5>
                                    <small class="mt-3 h6">&middot; {{libro.autor}} &middot; {{libro.autrol}}</small>
                                    <small class="m-0"><p>{{libro.topics}}</p></small>
                                    <div class="d-flex w-100 justify-content-between" style="margin-top: -0.8em;">
                                    <small class="card-text">{{libro.released}}</small>
                                    <small class="card-text">{{libro.views}} vistas</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>
<script>
//https://www.youtube.com/watch?v=9W0j1Dn3jWs
//--> comunicar componentes
export default {
    name:"Search",
    data(){
        return{
            request:this.stringBuscarView,
            books:[]
        }
    },
    props:{
        stringBuscarView:String
    },
    watch: {
        stringBuscarView: function (newValue, oldValue) {
        console.log("newValue: %s, previousValue: %s", newValue, oldValue);
        },
    },
    methods:{
        async ax_search_book(){
            console.log(this.request); 
            await this.axios.post('/axsearchbook',{"book":this.request})
            .then(response=>{
                console.log(response);
                this.books = response.data;
            })
            .catch(error=>{
                console.log(error.response.data)
            });
        }
    },
    mounted(){
        this.ax_search_book();
    }
}
</script>