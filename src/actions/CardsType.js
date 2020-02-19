export const SELECT_CARD = 'SELECT_CARD'
export const HIDE_CARD = 'HIDE_CARD'

export const selectCard = (id, value) => {
  return {
    type: SELECT_CARD,
    id,
    value
  }
}

export const hideCard = () => {
  return {
    type: HIDE_CARD
  }
}
