/* global wp */

import KirkiRangeControl from './KirkiRangeControl';

// Register control type with Customizer.
wp.customize.controlConstructor['kirki-slider'] = KirkiRangeControl;
