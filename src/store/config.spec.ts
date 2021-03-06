import { initConfig, reducer, isVisible } from './config';
import { RootState } from './reducers';

describe('Configuration reducer', () => {
  const disabledFeatures = { paypal: true, support: true };
  const enabledFeatures = { billing: true };

  it('should merge experimental and disabled features', () => {
    const actual = reducer(
      undefined,
      initConfig({
        disabledFeatures: ['paypal'],
        toBeFeatures: ['support'],
      }),
    );
    expect(actual.disabledFeatures).toEqual(disabledFeatures);
  });

  it('should parse enabled features', () => {
    const actual = reducer(
      undefined,
      initConfig({
        enabledFeatures: ['billing'],
      }),
    );
    expect(actual.enabledFeatures).toEqual(enabledFeatures);
  });

  it('should check disabled features', () => {
    const state = ({
      config: { disabledFeatures, enabledFeatures },
    } as unknown) as RootState;
    expect(isVisible(state, 'paypal')).toBe(false);
    expect(isVisible(state, 'support')).toBe(false);
  });

  it('should check enabled features', () => {
    const state = ({
      config: { disabledFeatures, enabledFeatures },
    } as unknown) as RootState;
    expect(isVisible(state, 'billing')).toBe(true);
  });

  it('should check visibility for all other features 1', () => {
    const state = ({
      config: { disabledFeatures, enabledFeatures, featuresVisible: true },
    } as unknown) as RootState;
    expect(isVisible(state, 'visibleFeature')).toBe(true);
  });

  it('should check visibility for all other features 2', () => {
    const state = ({
      config: { disabledFeatures, enabledFeatures, featuresVisible: false },
    } as unknown) as RootState;
    expect(isVisible(state, 'hiddenFeature')).toBe(false);
  });
});
