import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import PokeCard from "./PokeCard"
import { RootState, useAppDispatch } from '../Store'
import { fetchPokemons } from '../Store/pokemonsSlice'
import { useSelector } from 'react-redux'

const PokeCardList = () => {
  const dispatch = useAppDispatch()
  const { pokemons } = useSelector((state: RootState) => state.pokemons)

  const [infinityRef] = useInfiniteScroll( {
    loading: false,
    hasNextPage: pokemons.next !== '',
    onLoadMore: async () => {
      dispatch(fetchPokemons(pokemons.next));
      // setPokemons({
      //   ...morePokemons,
      //   results: [...pokemons.results, ...morePokemons.results]
      // })
    }, // 바닥에 닿았을 때 호출하는 거
    disabled: false,
    rootMargin: '0px 0px 400px 0px'
  })


  useEffect(() => {
    dispatch(fetchPokemons());

    // (async () => {
    //   const pokemons = await fetchPokemonsAPI()
    //   setPokemons(pokemons)
    // })()
  }, [dispatch])

  return (
    <>
      <List>
        {
          pokemons.results.map((pokemon, index) => {
            return (
              <PokeCard key={`${pokemon.name}_${index}`}
              name={pokemon.name} />
            )
          })
        }
      </List>
      <Loading ref={infinityRef}>
        Loading...
      </Loading>
    </>
  )
}

const Loading = styled.div`
  display: flex;
  justify-content: center;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`

export default PokeCardList