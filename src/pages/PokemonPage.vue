<template>
  <h1 v-if="!pokemon">Espere un momento ...</h1>
  <div v-else>
    <h1>¿Quién es este Pokemón?</h1>
    <!-- TODO img -->
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <!-- TODO Opciones -->
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer($event)"
    />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame" class="btn btn1"> Nuevo Juego </button>
    </template>

  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
  components: { 
    PokemonPicture, 
    PokemonOptions 
  },
  data(){
    return{
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message:''

    }
  },
  methods:{
    async mixPokemonArray(){
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor( Math.random() * 4)

      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(selectedId){
      if(selectedId == this.pokemon.id){
        this.message = `Correcto, ${this.pokemon.name}`;
      }else{
        this.message = `Ups!, el nombre era ${this.pokemon.name}`;
      }
      this.showPokemon  = true;
      this.showAnswer   = true;
    },
    newGame(){
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
    }
  },
  mounted(){
    this.mixPokemonArray()
  }

}
</script>

<style scoped>
.btn {
  color: #42b883;
  background: transparent;
  border: 2px solid #42b883;
  border-radius: 6px;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.btn1 {
  background-color: white;
  color: black;
  border: 2px solid #42b883;
}

.btn1:hover {
  background-color: #42b883;
  color: white;
}
</style>
