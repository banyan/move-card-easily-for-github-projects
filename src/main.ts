import { debounce } from './utils';

const waitMs = 30;
const cssTextToShrink = 'min-width: 30px;';

const columns = () =>
  document.querySelectorAll<HTMLDivElement>('.js-project-column');

const callback = () => {
  const chosen = document.querySelector('.js-project-column .sortable-chosen');
  const ghost = document.querySelector('.js-project-column .sortable-ghost');
  const addColumn = document.querySelector<HTMLDivElement>(
    '.js-new-project-column-container',
  );

  // without ghost, it would fire just click the title and can't drag it.
  if (chosen && ghost) {
    const chosenColumn = chosen?.parentElement?.parentElement;
    const ghostColumn = ghost?.parentElement?.parentElement;

    // addColumn occupies a large area of land.
    if (addColumn) addColumn.style.cssText = 'display: none';

    columns().forEach(column => {
      if (column !== chosenColumn && column !== ghostColumn) {
        column.style.cssText = cssTextToShrink;
      } else {
        column.removeAttribute('style');
      }
    });
  } else {
    columns().forEach(column => {
      column.removeAttribute('style');
    });
    if (addColumn) {
      addColumn.removeAttribute('style');
    }
  }
};

const observer = new MutationObserver(debounce(callback, waitMs));
const targetNode = document.querySelector('.js-project-columns');

const options = {
  attributes: true,
  subtree: true,
};

if (!!targetNode) {
  observer.observe(targetNode, options);
} else {
  throw new Error(
    '.js-project-columns is missing. GitHub must be changed the css :p',
  );
}
