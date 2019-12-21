/* globals _, wp, React */

import InputRange from 'react-input-range';
import reactCSS from 'reactcss';
import NumberFormat from 'react-number-format';

const KirkiRangeForm = ( props ) => {

	const decimalPoints = () => {
		if ( props.choices.step.toString().split( '.' )[1] ) {
			return props.choices.step.toString().split( '.' )[1].length;
		}
		return 0;
	};

	const formatNumber = ( val ) => {
		const pow = Math.pow( 10, decimalPoints() );
		return Math.round( val * pow ) / pow;
	}

	const formatValue = ( val ) => {
		return Math.min( props.choices.max, Math.max( props.choices.min, formatNumber( val ) ) );
	};

	props.choices.min = formatNumber( props.choices.min );
	props.choices.max = formatNumber( props.choices.max );
	props.choices.step = formatNumber( props.choices.step );

	props.choices.prefix = props.choices.prefix || '';
	props.choices.suffix = props.choices.suffix || '';

	const handleChangeComplete = ( val ) => {
		wp.customize.control( props.customizerSetting.id ).setting.set( formatValue( val ) );
	};

	const handleChangeCompleteTextInput = ( values ) => {
		const {formattedValue, value} = values;
		wp.customize.control( props.customizerSetting.id ).setting.set( formatValue( value ) );
	};

	// Styles.
	const styles = reactCSS( {
		default: {
			labelsWrapper: {
				display: 'flex',
				justifyContent: 'space-between',
				color: '#aaaaaa',
				fontSize: '10px',
			},

			valueLabel: {
				color: '#555d66',
				fontWeight: '700',
				fontSize: '13px'
			}
		}
	} );

	return (
		<div>
			<label className="customize-control-title">{ props.label }</label>
			<span class="description customize-control-description" dangerouslySetInnerHTML={{ __html: props.description }}></span>
			<div className="customize-control-notifications-container" ref={ props.setNotificationContainer }></div>
			<div class="range-input-wrapper">
				<div style={ styles.labelsWrapper } className={ 'manual-input-field' }>
					<span>{ props.choices.prefix }{ props.choices.min }{ props.choices.suffix }</span>
					<span style={ styles.valueLabel }>
						<NumberFormat
							value={ formatValue( props.value ) }
							displayType={ 'input' }
							prefix={ props.choices.prefix }
							suffix={ props.choices.suffix }
							onValueChange={ handleChangeCompleteTextInput }
						/>
					</span>
					<span>{ props.choices.prefix }{ props.choices.max }{ props.choices.suffix }</span>
				</div>
				<InputRange
					maxValue={ props.choices.max }
					minValue={ props.choices.min }
					step={ props.choices.step }
					value={ formatValue( props.value ) }
					onChange={ handleChangeComplete }
				/>
			</div>
		</div>
	);
};

export default KirkiRangeForm;
