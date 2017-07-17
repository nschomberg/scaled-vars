import * as Scales from 'd3-scale';

import Variable from './Variable';

/*
 * An instance of this class holds a list of variables and can update them - entry point for this library.
 */
export default class ScaledVars {
  constructor(variableOptions) {
    this.vars = variableOptions;
  }

  /*
   * Variables getter.
   */
  get vars() {
    return this._vars;
  }

  /*
   * Variables setter.
   */
  set vars(variableOptions) {
    this._vars = variableOptions.map(options => new Variable(options));
  }

  /*
   * Iterate over variables and apply scaled transformation on each.
   */
  update(value, vars = this.vars) {
    vars.forEach(variable => variable.update(value));
    return vars;
  }

  /*
   * Expose D3's scale engine module.
   */
  static get Scales() {
    return Scales;
  }

  /*
   * Expose underlying Variable class.
   */
  static get Variable() {
    return Variable;
  }
}
