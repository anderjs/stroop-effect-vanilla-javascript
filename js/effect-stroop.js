/**
 * @function createEffectStroopRoot the main function to create a createEffectStroopRoort.
 * @description setting the current element, and bootstrap claseses.
 */
const createEffectStroopRoot = () => {

  const row = createElementWithProps('div', [
    ['class', 'row'],
    ['id', 'row']
  ]);
  const stroopLeft = createElementWithProps('div', [
    ['class', 'col-md-6 border border-light p-5 text-center h4 text-capitalize'],
    ['id', 'stroop-left']
  ])
  const stroopRight = createElementWithProps('div', [
    ['class', 'col-md-6 border border-light p-5 text-center h4 text-capitalize'],
    ['id', 'stroop-right']
  ]);
  insertElement(row);
  return configBeforeStart({
    nodes: [stroopLeft, stroopRight],
    insertWith: '#row',
    defaultInit: true
  });
};

const configBeforeStart = ({
  ...config
}) => {
  try {
    checkConfigurationProperties(config);
  } catch (e) {
    console.error(e.message);
  }
  const {
    nodes,
    insertWith,
    defaultInit
  } = config;
  nodes.forEach((node) => insertElement(node, insertWith));
  return observerHandler(defaultInit ? 0 : 1000);
}

const observerHandler = (ms) => {
  const leftStroop = document.querySelector('#stroop-left');
  const rightStroop = document.querySelector('#stroop-right');
  setTimeout(() => {
    effectStroopCycle({
      leftStroop,
      rightStroop,
      colorsX: [
        ['red', 'blue'],
        ['blue', 'red']
        ['green', 'yellow'],
        ['purple', 'lightblue'],
        ['silver', 'white'],
        ['fuchsia', 'lime'],
        ['aqua', 'purple']
        ['crimson', 'black'],
        ['pink', 'aqua'],
        ['brown', 'turquoise'],
        ['turquoise', 'brown'],
        ['blue', 'purple'],
        ['lime', 'chocolate'],
        ['orchid', 'lightblue'],
        ['gray', 'orchid'],
        ['purple', 'orange'],
        ['aqua', 'gold'],
        ['hotpink', 'green']
      ],
      colorsY: [
        ['yellow', 'red'],
        ['gray', 'blue'],
        ['green', 'yellow'],
        ['red', 'yellow'],
        ['lime', 'fuchsia'],
        ['purple', 'aqua'],
        ['black', 'white'],
        ['silver', 'gold'],
        ['hotpink', 'blue'],
        ['lightgray', 'yellow'],
        ['blue', 'yellow'],
        ['salmon', 'black'],
        ['green', 'orange'],
        ['royablue', 'purple'],
        ['plum', 'green'],
        ['orange', 'crimson'],
        ['white', 'cyan']
      ],
      interval: 1000
    });
  }, ms);
}


const effectStroopCycle = ({
  ...effectStroopProperties
}) => {
  const {
    leftStroop,
    rightStroop,
    interval,
    colorsX,
    colorsY
  } = effectStroopProperties;
  setTimeout(() => {
    doEffectStroop(leftStroop, colorsX, interval);
    doEffectStroop(rightStroop, colorsY, interval);
  }, interval);
}

/**
 * 
 * @param {HTML.Element} stroopNode The current document to stroop.
 * @param {array} colors The current colors to stroop in interval.
 * @param {number} ms The time to do a new stroop effect.
 */
const doEffectStroop = (stroopNode, [...colors], ms) => {
  const iterator = colors.values();
  let interval = null;
  let intervalMaxTimes = colors.length;
  interval = setInterval(() => {
    intervalMaxTimes -= 1;
    const stroop = iterator.next().value;
    modifyNodeStroop(stroopNode, stroop); // Updating the element
    insertTextInStroop(stroopNode, stroop); // Inserting the text
    if (intervalMaxTimes === 0) {
      clearInterval(interval);
    }
  }, ms);
}

/**
 * @function modifyNodeStroop set the new properties for the current element.
 * @param {HTML.Document} node
 * @param {array} colorProps the background and the insert text.
 * @example
 * modifyNodeStroop('row', ['blue', 'red']) output: Background: blue, textColor: red
 */
const modifyNodeStroop = (node, [...colorProps]) => {
  const [background, color] = colorProps;
  node.style['background'] = background;
  node.style['color'] = color;
}

const insertTextInStroop = (node, [...colorProps]) => {
  const [_, color] = colorProps;
  return node.innerText = color;
}

/**
 * @function checkConfigurationProperties
 * @description Check if the arguments passed are valid in the shouldHave variable.
 */
const checkConfigurationProperties = ({
  ...config
}) => {
  const shouldHave = ['nodes', 'insertWith', 'defaultInit'];
  shouldHave.forEach((key) => {
    if (!config.hasOwnProperty(key)) {
      throw new Error(`Fail the execution of effect stroop: "${key}" is missing in configuration.`);
    }
  });
}

/**
 * @function createElementWithProps
 * @param {string} element The name of the element.
 * @param {array} props The properties of the element.
 * @example
 * createElementWithProps('div', ['class', 'text-danger']);
 */
const createElementWithProps = (element, [...props]) => {
  const created = document.createElement(element);
  props.forEach(([attribute, value]) => setElementAttribute(created, attribute, value));
  return created;
}

/**
 * @function setElementAttribute
 * @param {HTML.Element} element 
 * @param {string} attribute 
 * @param {string} value
 * @example
 * setElementAttribute(document.createElement('div'), 'id', 'example'); 
 */
const setElementAttribute = (element, attribute, value) => {
  return element.setAttribute(attribute, value);
}

/**
 * @function insertElement inserts an element as a child of the root element.
 * @param {HTML.Element} element
 * @param {string} root
 */
const insertElement = (element, root = '#app') => document.querySelector(root).appendChild(element);


createEffectStroopRoot();