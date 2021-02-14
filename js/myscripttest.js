let apiMovie = "https://api.themoviedb.org/3/search/movie";
let apiTv= "https://api.themoviedb.org/3/search/tv";

var app = new Vue({
  el: "#app",
  data: {
    yellowstar: "bgyellow",
    search:"casa",
    arrayAll: [],
    arrayResults: [],
    arrayMovie:[],
    arrayTv:[],
    apikey:'536b4c4fda91efaf8dcd925d42f6d67d',

  },

  mounted: function(){
    this.cerca();
  },

  methods:{
    cerca: function (){
      Promise.all([
        axios.get(apiMovie,
        { params:
          {
            api_key: this.apikey,
            language: "it-IT" ,
            query: this.search ,
            page: 1 ,
            include_adult: false,
          }
        }), 
        axios.get(apiTv,
          { params:
            {
              api_key: this.apikey,
              language: "it-IT" ,
              query: this.search ,
              page: 1 ,
              include_adult: false,
            }
          })
        ])
      .then(response => {
        // copio array per Movie e Tv come API generale
        this.arrayAll = response;
        console.log(this.arrayAll);

        // quando cerco film l'input torna vuoto
        this.search = "";

        this.details();

      });
    }, //fine funzione cerca

    details: function(){
      this.arrayAll.forEach((element,i)=>{

        //ottengo gli array results di Movie e Tv
        this.arrayResults = element.data.results;

        this.arrayResults.forEach((item,x) =>{
          
          // ***** VOTI ****
          // trasformo i voti DA (1 a 10)  A  (1 a 5)          
          item.vote_average = Math.floor(item.vote_average / 2);

          // ***** BANDIERE ****
          // condizione per output bandiera inglese
          if (item.original_language === 'en') {
            item.original_language = 'gb';
          }
          // trasformo tutte le lingue in bandiere
          item.original_language = 'https://www.countryflags.io/' + item.original_language + '/flat/24.png';


          // ***** POSTER ****
          // creo link intero immagini poster
          item.poster_path = 'https://image.tmdb.org/t/p/' + 'w185' + item.poster_path;

          // se manca l'img del poster la sostituisco
          if(item.poster_path === 'https://image.tmdb.org/t/p/' + 'w185' + 'null'){
            item.poster_path = 'https://img.freepik.com/vettori-gratuito/film-strip-sfondo_23-2147516042.jpg?size=338&ext=jpg';
          }

        });   //fine forEach arrayResults  

      }); //fine forEach arrayAll

      this.arrayMovie = this.arrayAll[0].data.results;
      this.arrayTv = this.arrayAll[1].data.results;

    }, //fine details

    // SCROLL MOVIE
    nextMovie: function(){

      const row = this.$refs['movieCarousel'];

      row.scrollLeft += 1200;
     
    },

    prevMovie: function(){

      const row = this.$refs['movieCarousel'];

      row.scrollLeft -= 1200;
     
    },

    // SCROLL SERIE
    nextSerie: function(){

      const row = this.$refs['tvCarousel'];

      row.scrollLeft += 1200;
     
    },

    prevSerie: function(){

      const row = this.$refs['tvCarousel'];
      
      row.scrollLeft -= 1200;
     
    }

  }
});

// SCROLL CON JS

// const row = document.querySelector('.container-cards');

// let arrowRight= document.querySelector('.fa-chevron-right');

// arrowRight.addEventListener('click', () => {

//   row.scrollLeft += row.offsetWidth;

// });