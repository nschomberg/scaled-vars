import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import ScaledVars from '../lib/scaled-vars.js';

chai.use(sinonChai);

describe('scaled-vars', () => {

  beforeEach(() => {
    sinon.stub(ScaledVars.Variable.CssCustomProperties, 'set');
    sinon.stub(ScaledVars.Variable.CssCustomProperties, 'unset');
  });

  afterEach(() => {
    ScaledVars.Variable.CssCustomProperties.set.restore();
    ScaledVars.Variable.CssCustomProperties.unset.restore();
  });

  it('should update variables', () => {
    // Given
    const vars = new ScaledVars([
      {
        name: 'color',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([500, 1000])
          .range(['papayawhip', 'red'])
          .clamp(true),
      },
      {
        name: 'size',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([0, 1000])
          .range([0, 100])
      },
      {
        name: 'too-small',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([200, 1200])
          .range([0, 100]),
      },
      {
        name: 'too-big',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([-200, -1200])
          .range([0, 100]),
      },
    ]);

    // When
    vars.update(100);

    // Then
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'color': 'rgb(255, 239, 213)',
    }));
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'size': '10',
    }));
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'too-small': '-10',
    }));
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'too-big': '-30',
    }));
  });

  it('should apply transformations', () => {
    // Given
    const vars = new ScaledVars([
      {
        name: 'size',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([0, 1000])
          .range([0, 100]),
        transform: (x) => (x + 1),
      },
    ]);

    // When
    vars.update(100);

    // Then
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'size': '11',
    }));
  });

  it('should apply units', () => {
    // Given
    const vars = new ScaledVars([
      {
        name: 'size',
        scale: ScaledVars.Scales
          .scaleLinear()
          .domain([0, 1000])
          .range([0, 100]),
        unit: 'pt',
      },
    ]);

    // When
    vars.update(100);

    // Then
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'size': '10pt',
    }));
  });

  it('should fail gracefully when no scale provided', () => {
    // Given
    const vars = new ScaledVars([
      {
        name: 'size',
      },
    ]);

    // When
    vars.update(100);

    // Then
    expect(ScaledVars.Variable.CssCustomProperties.set).to.have.been.calledWith(sinon.match({
      'size': '100',
    }));
  });
});
