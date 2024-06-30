import { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';

export const useGraphWrapper = () => {
  const { graphWrapper } = useContext(GraphContext);
  return graphWrapper;
};
