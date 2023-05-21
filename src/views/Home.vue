<template> 
    <ol class="breadcrumb mb-2">        
        <li v-if="loading" class="breadcrumb-item active text-white">Tendencias</li>
        <li v-else class="breadcrumb-item">
          <div class="spinner-border text-primary" style="padding:-10px" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </li>
    </ol>
    <div class="row">
      <div class="col-12 col-sm-6" v-for="objTitle in arrBook" v-bind:key="objTitle" @click="this.$router.push('/view/'+objTitle.idTitle)">
          <div class="card bg-dark mb-2">
              <div class="row g-0">
                  <div class="col-md-2 text-center p-2">
                      <img :src="objTitle.cImage" class="img-fluid bg-secondary thumb-post-img rounded shadow" :alt="objTitle.cTitle" />
                  </div>
                  <div class="col-md-10">
                      <div class="card-body p-2 stretched-link">
                          <h6 class="card-title text-white mb-0">{{(objTitle.cTitle.toUpperCase() + ' '+objTitle.cSubtitle.toUpperCase()).substring(0,100)}}</h6>
                          <small class="mt-3">&middot; {{objTitle.cAuthor}} &middot; {{objTitle.cRole}}</small>
                          <small class="m-0 text-white"><p>{{objTitle.cTopic}}</p></small>
                          <div class="d-flex w-100 justify-content-between" style="margin-top: -0.8em;">
                              <small>{{objTitle.nRelease}}</small>
                              <small>{{objTitle.nViews}} vistas</small>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>      
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      arrBook:[],
      loading:true
    }
  },  
  methods:{
    async GetTrendBook(){
      this.loading = false;      
      await this.axios.get('/books/trends')
        .then(response=>{
          if(response.data.success == 1){
            console.log(response.data.message);
            response.data.data.forEach(x => { x.idTitle = btoa(x.idTitle), x.cImage = x.cImage.length === 0?"https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg": x.cImage});
            const shuffledBooks = response.data.data.sort(() => Math.random() - 0.5);
            this.arrBook = shuffledBooks;
          }
          else{
            //Mostrar alerta
            console.log(response.data.message);
          }
        })
        .catch(error=>{
          console.log(error.response);
        });
      this.loading = true;
    }
  },
  mounted(){
    this.GetTrendBook();
  }
}
</script>
