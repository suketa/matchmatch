export const SELECT_CARD = 'SELECT_CARD'
export const MATCHE_CARD = 'MATCHE_CARD'
export const HIDE_CARD = 'HIDE_CARD'

export const selectCard = (id) => {
  return {
    type: SELECT_CARD,
    id
  }
}

export const matchCard = (id, value) => {
  return {
    type: MATCHE_CARD,
    id,
    value
  }
}

export const hideCard = () => {
  return {
    type: HIDE_CARD
  }
}
