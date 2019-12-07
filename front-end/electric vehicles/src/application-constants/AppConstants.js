
const ValidationConstants = {
    TEXT_INPUT_MIN_LENGTH: 3,
    TEXT_INPUT_MAX_LENGTH: 30,
    MIN_PASSENGERS: 1,
    MAX_PASSENGERS: 10,
    MIN_PAYLOAD_CAPACITY: 500,
    MAX_PAYLOAD_CAPACITY: 50000,
    MIN_NUMBER_OF_AXEL: 1,
    MAX_NUMBER_OF_AXEL: 10,
    MIN_TOP_SPEED: 30,
    MAX_TOP_SPEED: 500,
    MIN_ACCELERATION: 1,
    MAX_ACCELERATION: 50,
    MIN_CHARGING_TIME: 1,
    MAX_CHARGING_TIME: 120,
    MIN_NOMINAL_RANGE: 30,
    MAX_NOMINAL_RANGE: 1000,
    FIELD_IS_REQUIRED: 'This field is required',
    FIELD_LENGTH_HAS_NOT_TO_BE_LESS_THAN: "This field's length has not to be less than ",
    FIELD_LENGTH_HAS_NOT_TO_BE_GREATER_THAN: "This field's length has not to be greater than ",
    FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN: "This field's value has not to be less than ",
    FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN: "This field's value has not to be greater than ",
    PLEASE_ENTER_NUMBER:'Plese, enter number'
}

export { ValidationConstants }