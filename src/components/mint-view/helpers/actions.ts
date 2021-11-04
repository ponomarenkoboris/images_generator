type ActionTypes = Record<Uppercase<string>, Uppercase<string>>

export const actionsType: ActionTypes = {
    REFRESH_CANDY_MACHINE_STATE: 'REFRESH_CANDY_MACHINE_STATE',
    SET_IS_SOLD_OUT: 'SET_IS_SOLD_OUT',
    SET_BALANCE: 'SET_BALANCE',
    SET_IS_MINTING: 'SET_IS_MINTING'
}