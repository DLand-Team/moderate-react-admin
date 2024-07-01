import ELNode from '../model/node';

let model: ELNode;

export const setModel = (_newModel: ELNode) => {
  model = _newModel;
};

export const useModel = () => {
  return model;
};
