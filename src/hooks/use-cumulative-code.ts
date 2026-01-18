import { show } from '../components/show';
import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc: string[] = [show];
    const showFunNoop = 'var show = () => {}';
    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFunNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }

    return cumulativeCode;
  }).join('\n');
};
