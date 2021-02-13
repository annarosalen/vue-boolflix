const api = "https://api.themoviedb.org/3/search/multi";


var app = new Vue({
  el: "#app",
  data: {
    yellowstar: "bgyellow",
    search:"",
    arrayAll: [],
    apikey:'536b4c4fda91efaf8dcd925d42f6d67d',
    containerCards:'container-cards',
    card:'card',
    arrowRight:'fa fa-chevron-right',
    arrowLeft:'fa fa-chevron-left'

  },

  mounted: function(){
    axios.get(api,
      { params:
        {
          api_key: this.apikey,
          language: "it-IT" ,
          query: "casa" ,
          page: 1 ,
          include_adult: false
        }
      }
    )
    .then(response => {
      console.log(response)
      this.arrayAll = response.data.results;
      this.loop();
    })
  },

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
        // copio array per i film come API
        this.arrayAll = response.data.results;

        // quando cerco film l'input torna vuoto
        this.search = "";

        this.loop();

      })
    }, //fine funzione cerca

    loop: function(){
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
        // creo link intero immagini poster
        this.arrayAll[i].poster_path = 'https://image.tmdb.org/t/p/' + 'w185' + this.arrayAll[i].poster_path;

        // se manca l'img del poster la sostituisco
        if(this.arrayAll[i].poster_path === 'https://image.tmdb.org/t/p/' + 'w185' + 'null'){
          this.arrayAll[i].poster_path = 'https://img.freepik.com/vettori-gratuito/film-strip-sfondo_23-2147516042.jpg?size=338&ext=jpg';
        }

      }); //fine ciclo forEach
    },

    // SCROLL MOVIE
    nextMovie: function(){

      const row = document.querySelector('div.movies div.container-cards');

      row.scrollLeft += row.offsetWidth;
     
    },

    prevMovie: function(){

      const row = document.querySelector('div.movies div.container-cards');

      row.scrollLeft -= row.offsetWidth;
     
    },

    // SCROLL SERIE
    nextSerie: function(){

      const row = document.querySelector('div.serie-tv div.container-cards');
      
      row.scrollLeft += row.offsetWidth;
     
    },

    prevSerie: function(){

      const row = document.querySelector('div.serie-tv div.container-cards');

      row.scrollLeft -= row.offsetWidth;
     
    }

  }
});

// SCROLL CON JQUERY

// const row = document.querySelector('.container-cards');

// let arrowRight= document.querySelector('.fa-chevron-right');

// arrowRight.addEventListener('click', () => {

//   row.scrollLeft += row.offsetWidth;

// });