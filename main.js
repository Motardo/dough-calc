(function DoughCalc() {
  const MEDIUM = 12.85;
  const LARGE  = 17.85;
  const FAMILY = 23.84;
  const SINGLE = 530.12;
  // const ONEANDAHALF = 1.5 * SINGLE;
  // const DOUBLE = 2 * SINGLE;
  // const TRIPLE = 3 * SINGLE;

  const slider = document.getElementById('slider-color');
  const familyInput = document.getElementById('family-input');
  const largeInput = document.getElementById('large-input');
  const mediumInput = document.getElementById('medium-input');
  const singleBtn = document.getElementById('single');
  const oneandahalfBtn = document.getElementById('oneandahalf');
  const doubleBtn = document.getElementById('double');
  const tripleBtn = document.getElementById('triple');

  let batchSize = SINGLE;

  /* Parameters:
   *  - batch: single or double (530.1 for single)
   *  - handle0: the amount of dough for medium
   *  - handle1: the difference from batch to handle1 is available for family
   *             the difference between h0 and h1 is available for large
   * Returns: an array of [family, large, medium]
   */
  function calculateDoughBalls(batch, handle0, handle1) {
    const medium = handle0 / MEDIUM;
    const large  = (handle1 - handle0) / LARGE;
    const family = (batch - handle1) / FAMILY;

    return [family, large, medium];
  }

  noUiSlider.create(slider, {
    start: [0, 267.8],
    connect: [true, true, true],
    direction: 'rtl',
    behaviour: 'drag',
    range: {
      min: [0],
      max: [batchSize],
    },
  });

  {
    const connect = slider.querySelectorAll('.noUi-connect');
    connect[0].classList.add('c-1-color');
    connect[1].classList.add('c-2-color');
    connect[2].classList.add('c-3-color');
  }

  slider.noUiSlider.on('update', (values) => {
    const [family, large, medium] = calculateDoughBalls(batchSize, values[0], values[1]);

    familyInput.value = family.toFixed(1);
    largeInput.value = large.toFixed(1);
    mediumInput.value = medium.toFixed(1);
  });

  function familyInputChanged() {
    slider.noUiSlider.set([null, batchSize - (familyInput.value * FAMILY)]);
  }

  function largeInputChanged() {
    const families = familyInput.value * FAMILY;
    const larges = largeInput.value * LARGE;
    slider.noUiSlider.set([batchSize - (families + larges), null]);
  }

  function mediumInputChanged() {
    slider.noUiSlider.set([mediumInput.value * MEDIUM, null]);
  }

  mediumInput.addEventListener('change', mediumInputChanged);
  largeInput.addEventListener('change', largeInputChanged);
  familyInput.addEventListener('change', familyInputChanged);

  document.getElementById('up-family').addEventListener('click', () => {
    familyInput.value = Math.floor(familyInput.value) + 1;
    familyInputChanged();
  });

  document.getElementById('down-family').addEventListener('click', () => {
    familyInput.value = Math.ceil(familyInput.value) - 1;
    familyInputChanged();
  });

  document.getElementById('up-large').addEventListener('click', () => {
    largeInput.value = Math.floor(largeInput.value) + 1;
    largeInputChanged();
  });

  document.getElementById('down-large').addEventListener('click', () => {
    largeInput.value = Math.ceil(largeInput.value) - 1;
    largeInputChanged();
  });

  document.getElementById('up-medium').addEventListener('click', () => {
    mediumInput.value = Math.floor(mediumInput.value) + 1;
    mediumInputChanged();
  });

  document.getElementById('down-medium').addEventListener('click', () => {
    mediumInput.value = Math.ceil(mediumInput.value) - 1;
    mediumInputChanged();
  });

  function deActivateAll() {
    singleBtn.classList.remove('active');
    oneandahalfBtn.classList.remove('active');
    doubleBtn.classList.remove('active');
    tripleBtn.classList.remove('active');
  }

  function selectBatch(e) {
    e.preventDefault();
    deActivateAll();
    e.target.classList.add('active');
    batchSize = SINGLE * e.target.dataset.batch;
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: batchSize,
      },
    });
  }

  singleBtn.addEventListener('click', selectBatch);
  oneandahalfBtn.addEventListener('click', selectBatch);
  doubleBtn.addEventListener('click', selectBatch);
  tripleBtn.addEventListener('click', selectBatch);
}());

