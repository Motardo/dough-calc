const MEDIUM = 12.85;
const LARGE  = 17.85;
const FAMILY = 23.84;
const SINGLE = 530.12;
const DOUBLE = 2 * SINGLE;

let batchSize = SINGLE;

/* Parameters:
 *  - batch: single or double (530.1 for single)
 *  - handle0: the amount of dough for medium
 *  - handle1: the difference from batch to handle1 is available for family
 *             the difference between h0 and h1 is available for large
 * Returns: an array of [family, large, medium]
 */
function calculateDoughBalls(batch, handle0, handle1) {
  medium = handle0 / MEDIUM;
  large  = (handle1 - handle0) / LARGE;
  family = (batch - handle1) / FAMILY;

  return [family, large, medium];
}

/* Tests
*/
test1 = calculateDoughBalls(batchSize, 0, 225)


const slider = document.getElementById('slider-color');
const familyInput = document.getElementById('family-input');
const largeInput = document.getElementById('large-input');
const mediumInput = document.getElementById('medium-input');
const singleBtn = document.getElementById('single');
const doubleBtn = document.getElementById('double');

noUiSlider.create(slider, {
  start: [ 0, 267.8 ],
  connect: [true, true, true],
  direction: 'rtl',
  behaviour: 'drag',
  range: {
    'min': [  0 ],
    'max': [ batchSize ]
  }
});

const connect = slider.querySelectorAll('.noUi-connect');
const classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

for ( let i = 0; i < connect.length; i++ ) {
  connect[i].classList.add(classes[i]);
}

/* 'update' is called with two arguments:
 *  - values: an array of handle values
 *  - handle: an index corresponding to the value that changed
 *
 */
slider.noUiSlider.on('update', function( values, handle ) {

  // var value = values[handle];
  const [family, large, medium] = calculateDoughBalls(batchSize, values[0], values[1]);

  familyInput.value = family.toFixed(1);
  largeInput.value = large.toFixed(1);
  mediumInput.value = medium.toFixed(1);

  // console.log("update event: %s", values.toString());
  // console.log("result: %s, %s, %s", family, large, medium);
  // if ( handle ) {
  // inputNumber.value = value;
  // } else {
  // select.value = Math.round(value);
  // }
});

function familyInputChanged() {
  slider.noUiSlider.set([null, batchSize - (familyInput.value * FAMILY)]);
  console.log("change %s", familyInput.value);
}
function largeInputChanged() {
  // set handle0 to what is left from family and larges
  families = familyInput.value * FAMILY;
  larges = largeInput.value * LARGE;
  slider.noUiSlider.set([batchSize - (families + larges), null]);
  console.log("change %s", largeInput.value);
}
function mediumInputChanged() {
    slider.noUiSlider.set([mediumInput.value * MEDIUM, null]);
    console.log("change %s", mediumInput.value);
}

mediumInput.addEventListener('change', mediumInputChanged);
largeInput.addEventListener('change', largeInputChanged);
familyInput.addEventListener('change', familyInputChanged);

document.getElementById('up-family').addEventListener('click', function() {
  familyInput.value = Math.floor(familyInput.value) + 1;
  familyInputChanged();
});
document.getElementById('down-family').addEventListener('click', function() {
  familyInput.value = Math.ceil(familyInput.value) - 1;
  familyInputChanged();
});
document.getElementById('up-large').addEventListener('click', function() {
  largeInput.value = Math.floor(largeInput.value) + 1;
  largeInputChanged();
});
document.getElementById('down-large').addEventListener('click', function() {
  largeInput.value = Math.ceil(largeInput.value) - 1;
  largeInputChanged();
});
document.getElementById('up-medium').addEventListener('click', function() {
  mediumInput.value = Math.floor(mediumInput.value) + 1;
  mediumInputChanged();
});
document.getElementById('down-medium').addEventListener('click', function() {
  mediumInput.value = Math.ceil(mediumInput.value) - 1;
  mediumInputChanged();
});

singleBtn.addEventListener('click', function(e) {
  e.preventDefault();
  doubleBtn.classList.remove('active');
  singleBtn.classList.add('active');
  batchSize = SINGLE;
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: SINGLE,
    }
  });
});
doubleBtn.addEventListener('click', function(e) {
  e.preventDefault();
  singleBtn.classList.remove('active');
  doubleBtn.classList.add('active');
  batchSize = DOUBLE;
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: DOUBLE,
    }
  });
});

