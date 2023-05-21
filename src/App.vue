<template>
  <nav class="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
    <div class="container-xxl">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/arixbooksopus.png" alt="" width="65" class="d-inline-block align-text-top">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Documentación
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">API Rest</a></li>
              <li><a class="dropdown-item" href="#">GitHub</a></li>
            </ul>
          </li> 
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Products
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Translate</a></li>
              <li><a class="dropdown-item" href="#">Arix MEE</a></li>            
              <li><a class="dropdown-item" href="#">Arix Book Scraping</a></li>
            </ul>
          </li>         -->
        </ul>
        <div class="d-flex col-md-5">
          <div class="input-group">
            <input type="search" v-model="axsearch" v-on:keyup.enter="ax_home_search()" class="form-control" placeholder="Buscar" aria-label="Recipient's username with two button addons">
            <button class="btn btn-outline-secondary" @click="ax_home_search()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
        <!-- <div class="dropdown ms-1">
          <button class="btn btn-outline-secondary dropdown-toggle" id="ax-opusession" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
            <span class="d-none d-lg-inline">Ingresar </span>...
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ax-opusession">
            <li><a class="dropdown-item current" aria-current="true" href="/docs/5.0/">A</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="https://getbootstrap.com/docs/4.6/">RS Core API</a></li>
          </ul>
        </div>-->
      </div>
    </div>
  </nav>
  <main class="container-xl mt-2">    
      <router-view/>  
  </main>
</template>

<script>
//https://bootswatch.com/solar/
  //import M from 'materialize-css'
  export default {
    name: 'App',
    data(){
      return{
        axsearch:""         
      }
    },
    methods:{
      ax_home_search(){
        if(this.axsearch.length > 0){
            this.$router.push('/search/'+this.axsearch);
        }else{
          return;
        }        
      }
    }
  }
</script>
<style>
@media screen and (max-width: 700px) {
  .thumb-post-img {
    object-fit: none;
    object-position: top; /* Center the image within the element */
    width: 100%;
    max-height: 150px;
  }
}
</style>