<template>
    <ol class="breadcrumb mb-2">
        <li v-if="loading" class="breadcrumb-item active text-white">{{cant}} resultados para "{{this.$route.params.book}}"</li>
        <li v-else class="breadcrumb-item">
          <div class="spinner-border text-primary" style="padding:-10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li>
    </ol>
    <div class="row">
        <div class="col-12 col-sm-8">
            <div class="row">
                <div class="col-12 col-sm-12 pe-auto" v-for="title in arrBook" v-bind:key="title" @click="this.$router.push('/view/'+title.idTitle)">
                    <div class="card bg-dark mb-2">
                        <div class="row g-0">
                            <div class="col-md-2 text-center p-2">
                                <img :src="title.cImage" class="img-fluid bg-secondary thumb-post-img rounded shadow" :alt="title.cTitle" />
                            </div>
                            <div class="col-md-10">
                                <div class="card-body p-2 stretched-link">
                                    <h5 class="card-title text-white mb-0"> {{title.cTitle.toUpperCase() + ' '+title.cSubtitle.toUpperCase()}}</h5>
                                    <small class="mt-3 h6">&middot; {{title.cAuthor}} &middot; {{title.cRole}}</small>
                                    <small class="text-white m-0"><p>{{title.cTopic}}</p></small>
                                    <div class="d-flex w-100 justify-content-between" style="margin-top: -0.8em;">
                                    <small class="card-text">{{title.nRelease}}</small>
                                    <small class="card-text">{{title.nViews}} vistas</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        <div class="col-12 col-sm-4">
            <ol class="breadcrumb mb-2">        
                <li class="breadcrumb-item">Publicidad</li>
           </ol>
        </div>
    </div>   

</template>
<script>
//https://www.youtube.com/watch?v=9W0j1Dn3jWs
//--> comunicar componentes
// para escuchar los params -> https://prismic.io/docs/technologies/vue-route-parameters
//import search from '@/components/Search'
export default {
    name:"Buscar",    
    data(){
        return{            
            arrBook:[],
            cant:0,
            loading:true
        }
    },
    methods:{        
        async ax_search_book_api(text){     
            this.loading = false;        
            await this.axios.get('/books/search',{params:{"cKeyWord":text}})
                .then(response=>{
                    if(response.data.success == 1){
                        console.log(response.data.message);
                        response.data.data.forEach(x => { x.idTitle = btoa(x.idTitle), x.cImage = x.cImage.length === 0?"https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg": x.cImage});
                        this.arrBook = response.data.data;                
                        this.cant = response.data.data.length;
                        // console.log(this.arrBook);
                    }
                    else{
                        console.log(response.data.message);
                    }               
                })
                .catch(error=>{
                    console.log(error.response.data)
                });
                this.loading = true;
        }
    },    
    created () {
        this.ax_search_book_api(this.$route.params.book);
    },
    beforeRouteUpdate (to) {
        this.ax_search_book_api(to.params.book);       
    }
}
</script>