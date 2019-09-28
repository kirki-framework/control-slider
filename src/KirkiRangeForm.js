/* globals _, wp, React */

import InputRange from 'react-input-range';

const KirkiRangeForm = ( props ) => {

	const handleChangeComplete = ( val ) => {
		wp.customize.control( props.customizerSetting.id ).setting.set( val );
	};

	const labelFormat = ( value ) => {
		return props.choices.suffix ? value + props.choices.suffix : value;
	};

	return (
		<div>
			<label className="customize-control-title">{ props.label }</label>
			<span class="description customize-control-description" dangerouslySetInnerHTML={{ __html: props.description }}></span>
			<div className="customize-control-notifications-container" ref={ props.setNotificationContainer }></div>
			<InputRange
				maxValue={ props.choices.max }
				minValue={ props.choices.min }
				step={ props.choices.step }
				value={ props.value }
				onChange={ handleChangeComplete }
				formatLabel={ labelFormat }
			/>
		</div>
	);
};

export default KirkiRangeForm;
