export const show = `
let rootElement;
var show = (value) => {
  const root = document.querySelector('#root');

  if (!rootElement) {
    // React 18 createRoot
    rootElement = ReactDOM.createRoot(root);
  }

  if (typeof value === 'object') {
    if (value.$$typeof && value.props) {
      rootElement.render(value);
    } else {
      root.innerHTML = JSON.stringify(value);
    }
  } else {
    root.innerHTML = value;
  }
};
`;
