import { Graph } from '@antv/x6';
import { setModel, useModel } from './useModel';
import ELBuilder from '../model/builder';
import ELNode from '../model/node';

export const history = {
  $historyStack: [] as any[],
  $cursorIndex: 0 as number,
  $graph: undefined as Graph | undefined,
  init(graph: Graph) {
    this.$graph = graph;
    this.$historyStack = [];
    this.$cursorIndex = 0;
  },
  canRedo() {
    return this.$cursorIndex < this.$historyStack.length - 1;
  },
  canUndo() {
    return this.$cursorIndex > 0;
  },
  push(nextState: ELNode, options: Record<string, any> = { silent: false }) {
    if (this.$historyStack.length > this.$cursorIndex + 1) {
      this.$historyStack.splice(
        this.$cursorIndex + 1,
        this.$historyStack.length - this.$cursorIndex,
      );
    }

    if (nextState) {
      this.$historyStack.push(nextState.toJSON());
    } else {
      this.$historyStack.push(useModel().toJSON());
    }
    this.$cursorIndex++;
    if (!options.silent) {
      this.$graph.trigger('model:change');
      this.$graph.trigger('toolBar:forceUpdate');
      this.$graph.trigger('settingBar:forceUpdate');
    }
  },
  redo() {
    if (this.canRedo()) {
      this.$cursorIndex++;
      setModel(ELBuilder.build(this.$historyStack[this.$cursorIndex]));
      this.$graph.trigger('model:change');
      this.$graph.trigger('toolBar:forceUpdate');
      this.$graph.trigger('settingBar:forceUpdate');
    }
  },
  undo() {
    if (this.canUndo()) {
      this.$cursorIndex--;
      setModel(ELBuilder.build(this.$historyStack[this.$cursorIndex]));
      this.$graph.trigger('model:change');
      this.$graph.trigger('toolBar:forceUpdate');
      this.$graph.trigger('settingBar:forceUpdate');
    }
  },
  cleanHistory() {
    this.$historyStack = [useModel().toJSON()];
    this.$cursorIndex = 0;
    this.$graph.trigger('model:change');
    this.$graph.trigger('toolBar:forceUpdate');
    this.$graph.trigger('settingBar:forceUpdate');
  },
  length() {
    return this.$historyStack.length ? this.$historyStack.length - 1 : 0;
  },
} as Record<string, any>;

export const useHistory = () => {
  // const { history } = useContext(GraphContext);
  return history;
};
