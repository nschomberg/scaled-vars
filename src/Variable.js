import CssCustomProperties from 'css-custom-properties';

/*
 * This class represents a variable.
 * It holds a variable's pertinent information, uses it to calculate scaled values, and applies it to the DOM.
 */
export default class Variable {

  constructor(options) {
    this.options = options;
  }

  /*
   * Variable's name.
   */
  get name() {
    return this.options.name;
  }

  /*
   * Variable's scale.
   */
  get scale() {
    return this.options.scale || (x => x);
  }

  /*
   * Variable's Dom element (Optional). If undefined, will fallback on ":root" element.
   */
  get element() {
    return this.options.element;
  }

  /*
   * Variable's transformation (Optional).
   */
  get transform() {
    return this.options.transform || (x => x);
  }

  /*
   * Variable's unit (Optional).
   */
  get unit() {
    return this.options.unit || '';
  }

  /*
   * Variable's unit (Optional).
   */
  getTransformedValue(value, transform = this.transform, scale = this.scale, unit = this.unit) {
    return `${transform(scale(value))}${unit}`;
  }

  /*
   * Helper to determine if value is within variable's range..
   */
  isWithinRange(value, scale = this.scale) {
    return value >= Math.min(...scale.domain()) && value <= Math.max(...scale.domain());
  }

  /*
   * Transform variable based on scale. Apply it to the DOM.
   */
  update(value) {
    // Apply transformations.
    this.value = this.getTransformedValue(value);

    // Apply variable to the DOM.
    Variable.CssCustomProperties.set({
      [this.name]: this.value,
    }, this.element);

    return this.value;
  }

  /*
   * Expose CssCustomProperties Module
   */
  static get CssCustomProperties() {
    return CssCustomProperties;
  }
}
