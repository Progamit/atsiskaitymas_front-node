import { create } from 'zustand'
import {SingleItemType} from "./userStore.js";
import {CharactersDataType} from "./charactersStore.js";

export type PlayerStatsType = {
    username: string
    health: number
    inventory: {
        weapon: SingleItemType | undefined
        armor: SingleItemType | undefined
        potion: SingleItemType | undefined
    }
    character: CharactersDataType
}

type BattleDataType = {
    id: string
    player1: PlayerStatsType
    player2: PlayerStatsType
    timer: null,
    turn: number
}

type BattleStoreType = {
    battleData: BattleDataType | undefined
    setBattleData: (data:BattleDataType) => void
}

export const useBattleStore = create<BattleStoreType>((set) => ({
    battleData: undefined,
    setBattleData: (data) => set ( {battleData: data} )
}))