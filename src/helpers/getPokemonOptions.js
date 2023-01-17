import pokemonApi from "@/api/pokemonApi"

const getPockemons = () => {

  const pokemonArr = Array.from( Array(650) )

  return pokemonArr.map((_,index) => index + 1 )

}

const getPockemoOptions = async () => {

  const mixedPokemons = getPockemons().sort(() => Math.random() - 0.5 )

  const pokemons = await getPockemoNames(mixedPokemons.splice(0,4))

  return pokemons
}

const getPockemoNames = async ( [a,b,c,d] = [] ) => {

  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]

  const [p1, p2, p3, p4] = await Promise.all( promiseArr )

  return [
    {name: p1.data.name, id: p1.data.id},
    {name: p2.data.name, id: p2.data.id},
    {name: p3.data.name, id: p3.data.id},
    {name: p4.data.name, id: p4.data.id},
  ]
  
}

export default getPockemoOptions