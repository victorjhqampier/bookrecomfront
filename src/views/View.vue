<template>
<div class="row">
    <div class="col-12 col-sm-7">
        <ol v-if="viewLoading" class="breadcrumb mb-2">
            <li class="breadcrumb-item">
            <div class="spinner-border text-primary" style="padding:-10px" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </li>
        </ol>
        <div class="row" v-show="!viewLoading">
            <div class="col-lg-4 text-center">
                <img :src="objTitle.cImage.length === 0?'https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg': objTitle.cImage" alt="avatar" class="img-fluid bg-secondary rounded shadow mb-2" />
            </div>
            <div class="col-lg-8">
                <table class="table table-sm table-striped bg-dark mb-4">
                    <tbody>
                        <tr>
                            <th scope="row">Título</th>
                            <td class="text-white h5">{{objTitle.cTitle}} {{objTitle.cSubtitle}}</td>
                        </tr>
                        <tr v-if="objSerialTitle !== null">
                            <th scope="row">Serie</th>
                            <td>{{objSerialTitle.cTitle}}, {{objSerialTitle.cNumber}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tipo</th>
                            <td>{{objTitle.cType}} {{objTitle.cIsbn}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Edición</th>
                            <td>{{objTitle.nReleased}} {{objTitle.cEdition}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Respon.</th>
                            <td>
                                <ul class="list-unstyled">
                                    <li v-for="aut in arrAuthor" v-bind:key="aut">{{aut.cName}}, {{aut.cSurname}}: {{aut.cRole}}. {{aut.cPlace}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Editorial</th>
                            <td>
                                <ul class="list-unstyled">
                                    <li v-for="edi in arrEditor" v-bind:key="edi">{{edi.cName}}, {{edi.cPlace}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Notas</th>
                            <td>{{objTitle.cNotes}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Temas</th>
                            <td>{{objTitle.cTopics}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Contenido</th>
                            <td>{{objTitle.cContent}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-sm bg-dark">
                    <thead>
                        <tr class="text-white">
                            <th scope="col">Notación</th>
                            <th scope="col">Biblioteca</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="exe in arrCopy" v-bind:key="exe">
                            <td>{{exe.cNotation}}</td>
                            <td><a :href="exe.cLink" target="_blank" class="text-decoration-none">{{exe.cLibrary}}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-5">
        <ol class="breadcrumb mb-2 text-center">
            <li v-if="recLoading" class="breadcrumb-item active text-white">Recomendaciones</li>
            <li v-else class="breadcrumb-item">
                <div class="spinner-border text-primary" style="padding:-10px" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </li>
        </ol>
        <div class="card bg-dark mb-2" style="max-width: 600px;" v-for="recom in arrRecom" v-bind:key="recom" @click="this.$router.push('/view/'+recom.idTitle)">
            <div class="row g-0">
                <div class="col-md-2 text-center p-2">
                    <img :src="recom.cImage" class="img-fluid bg-secondary thumb-post-img rounded shadow" alt="..." />
                </div>
                <div class="col-md-10">
                    <div class="card-body p-2 stretched-link">
                        <h6 class="card-title text-white mb-0">{{recom.cTitle}} {{recom.cSubtitle}}</h6>
                        <small class="mt-3">&middot; {{recom.cAuthor}} &middot; {{recom.cRole}}</small>
                        <div class="d-flex w-100 justify-content-between">
                            <small>{{recom.cRelease}}</small>
                            <small>{{recom.nViews}} vistas</small>
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
    name:"View",
    data(){
        return{
            objTitle:{
                cContent: "",
                cEdition: "",
                cImage: "",
                cIsbn: "",
                cNotes: "",
                cSubtitle: "",
                cTitle: "",
                cTopics: "",
                cType: "",
                dUpdated: "",
                idTitle: "",
                nReleased: 0
            },
            objSerialTitle:{},
            arrAuthor:[],
            arrEditor:[],
            arrCopy:[],
            viewLoading:false,
            recLoading:true,
            arrRecom:[]
        }
    },
    methods:{
        async ax_get_recom_jaccard_index(idTitle){     
            this.recLoading = false;
            scroll(0, 0);    
            await this.axios.post('/books/recom/jaccard-index',{"idTitle":idTitle})
            .then(response=>{
                if(response.data.success == 1){
                    response.data.data.forEach(x => { x.idTitle = btoa(x.idTitle), x.cImage = x.cImage.length === 0?"https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg": x.cImage});
                    this.arrRecom = response.data.data;
                }
                else{                    
                    console.log(response.data.message);
                }                
            })
            .catch(error=>{                
                console.log(error.response)
            });            
            this.recLoading = true;        
        },
        async ax_get_recom_classification(idTitle){               
            await this.axios.post('/books/recom/classification',{"idTitle":idTitle})
            .then(response=>{
                if(response.data.success == 1){
                    response.data.data.forEach(x => { x.idTitle = btoa(x.idTitle), x.cImage = x.cImage.length === 0?"https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg": x.cImage});
                    this.arrRecom = this.arrRecom.concat(response.data.data);
                }
                else{                    
                    console.log(response.data.message);
                }                
            })
            .catch(error=>{                
                console.log(error.response)
            });       
        },
        async ax_get_recom_co_responsibility(idTitle){            
            await this.axios.post('/books/recom/co-responsibility',{"idTitle":idTitle})
            .then(response=>{
                if(response.data.success == 1){
                    response.data.data.forEach(x => { x.idTitle = btoa(x.idTitle), x.cImage = x.cImage.length === 0?"https://i.pinimg.com/originals/c4/5a/d4/c45ad4aa77906c54c8bc52930cb08f01.jpg": x.cImage});
                    this.arrRecom = this.arrRecom.concat(response.data.data);
                }
                else{                    
                    console.log(response.data.message);
                }                
            })
            .catch(error=>{                
                console.log(error.response)
            });       
        },
        async ax_get_book_api(text){     
            this.viewLoading = true;
            await this.axios.post('/books/show-book',{"idTitle":atob(text)})
            .then(response=>{                
                if(response.data.success == 1){
                    this.objTitle = response.data.data.title;
                    this.objSerialTitle = response.data.data.serialTitle;
                    this.arrAuthor = response.data.data.person;
                    this.arrEditor = response.data.data.publisher;
                    this.arrCopy = response.data.data.copy;
                }// Else No Result
            })
            .catch(error=>{
                console.log(error.response)
            });
            this.viewLoading = false;            
            await this.ax_get_recom_jaccard_index(atob(text)); 
            await this.ax_get_recom_classification(atob(text));          
            await this.ax_get_recom_co_responsibility(atob(text));            
        }
    },    
    created () {
        this.ax_get_book_api(this.$route.params.bookid);
    },
    beforeRouteUpdate (to) {
        this.ax_get_book_api(to.params.bookid);       
    }
}
</script>

