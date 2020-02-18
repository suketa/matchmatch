import { useDispatch } from 'react-redux';
import { useCallback } from 'react'
import { hideCard } from '../actions/CardsType'

const useAsyncReverse = () => {
  const dispatch = useDispatch();

  const asyncReverse = useCallback(async () => {
    await sleep(500);
    dispatch(hideCard());
  }, [ dispatch  ]);
  return asyncReverse
}

function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export default useAsyncReverse
