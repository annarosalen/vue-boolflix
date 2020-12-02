const api = "https://api.themoviedb.org/3/search/movie";


var app = new Vue({
  el: "#app",
  data: {
    search:"",
    arrayMovies: [],
    apikey:'536b4c4fda91efaf8dcd925d42f6d67d'
  },

  // mounted: function(){
  //   axios.get(api,
  //     { params:
  //       {
  //         api_key: this.apikey,
  //         language: "it-IT" ,
  //         query: "casa" ,
  //         page: 1 ,
  //         include_adult: false
  //       }
  //     }
  //   )
  //   .then(response => {
  //     this.arrayMovies = response.data.results;
  //     console.log(response.data.results);
  //   })
  // },

  methods:{
    cerca: function(){
      axios.get(api,
        { params:
          {
            api_key: this.apikey,
            language: "it-IT" ,
            query: this.search ,
            page: 1 ,
            include_adult: false
          }
        }
      )
      .then(response => {
        this.arrayMovies = response.data.results;
        // for (var i = 0; i < this.arrayMovies.length; i++) {
        //   console.log(this.arrayMovies[i].title)
        //   console.log(this.arrayMovies[i].original_title);
        // }
        // this.arrayMovies.forEach((element,i)=>{
        //   console.log(this.arrayMovies[i].title);
        //   console.log(this.arrayMovies[i].original_title);
        // })

      })
    }
  }
});
