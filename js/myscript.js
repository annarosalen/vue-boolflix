const api = "https://api.themoviedb.org/3/search/multi";


var app = new Vue({
  el: "#app",
  data: {
    poster:"",
    yellowstar: "bgyellow",
    search:"",
    arrayAll: [],
    apikey:'536b4c4fda91efaf8dcd925d42f6d67d',
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
            include_adult: false,
          }
        }
      )
      .then(response => {
        // copio array per i film como API
        this.arrayAll = response.data.results;


        this.arrayAll.forEach((element,i)=>{

          // ***** VOTI ****
          // trasformo i voti DA (1 a 10)  A  (1 a 5)
          this.arrayAll[i].vote_average = Math.floor(this.arrayAll[i].vote_average / 2);


          // ***** BANDIERE ****
          // condizione per output bandiera inglese
          if (this.arrayAll[i].original_language === 'en') {
            this.arrayAll[i].original_language = 'gb';
          }
          // trasformo tutte le lingue in bandiere
          this.arrayAll[i].original_language = 'https://www.countryflags.io/' + this.arrayAll[i].original_language + '/flat/24.png';



          // ***** POSTER ****
          // creo link intero immagini poster Milestone 3
          // this.arrayAll[i].poster_path = 'https://image.tmdb.org/t/p/' + 'w185' + this.arrayAll[i].poster_path;

          // Milestone 4 poster copertina
          this.poster = 'https://image.tmdb.org/t/p/' + 'w185' + this.arrayAll[i].poster_path;
          console.log(this.poster);

        }); //fine ciclo forEach


      })
    },

  }
});
