const MEDIUM = 12.85;
const LARGE  = 17.85;
const FAMILY = 23.84;

let batchSize = 530.12;

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

noUiSlider.create(slider, {
  start: [ 0, 225 ],
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

  familyInput.value = family.toFixed(2);
  largeInput.value = large.toFixed(2);
  mediumInput.value = medium.toFixed(2);

  console.log("update event: %s", values.toString());
  console.log("result: %s, %s, %s", family, large, medium);
  // if ( handle ) {
  // inputNumber.value = value;
  // } else {
  // select.value = Math.round(value);
  // }
});

mediumInput.addEventListener('change', function() {
  slider.noUiSlider.set([this.value * MEDIUM, null]);
  console.log("change %s", this.value);
});

largeInput.addEventListener('change', function() {
  // set handle0 to what is left from family and larges
  families = familyInput.value * FAMILY;
  larges = this.value * LARGE;
  slider.noUiSlider.set([batchSize - (families + larges), null]);
  console.log("change %s", this.value);
});

familyInput.addEventListener('change', function() {
  slider.noUiSlider.set([null, batchSize - (this.value * FAMILY)]);
  console.log("change %s", this.value);
});