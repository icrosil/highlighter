import 'rangy/lib/rangy-textrange';
import rangy from 'rangy';

export const getSelectionOffset = element => {
  const selection = rangy.getSelection();
  const textSelected = selection.toString();
  const range = selection.getRangeAt(0);
  const { start, end } = range.toCharacterRange(element);
  return {
    text: textSelected,
    start,
    end,
  };
};
