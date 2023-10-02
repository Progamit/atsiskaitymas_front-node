import { create } from 'zustand'

export type CharactersDataType = {
    id: string
    image: string
    bigImage: string
}

type CharactersStoreType = {
    characters: CharactersDataType[] | []
    setCharacters: (data:CharactersDataType[]) => void
}

export const useCharactersStore = create<CharactersStoreType>((set) => ({
    characters: [],
    setCharacters: (data) => set({ characters: data }),
}))