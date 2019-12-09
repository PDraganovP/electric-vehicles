import * as Yup from 'yup';
import { ValidationConstants as vc } from '../../application-constants/AppConstants';

export const formSchema = Yup.object().shape({
    manufacturer: Yup.string()
        .min(vc.TEXT_INPUT_MIN_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_LESS_THAN + vc.TEXT_INPUT_MIN_LENGTH)
        .max(vc.TEXT_INPUT_MAX_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_GREATER_THAN + vc.TEXT_INPUT_MAX_LENGTH)
        .required(vc.FIELD_IS_REQUIRED),
    model: Yup.string()
        .min(vc.TEXT_INPUT_MIN_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_LESS_THAN + vc.TEXT_INPUT_MIN_LENGTH)
        .max(vc.TEXT_INPUT_MAX_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_GREATER_THAN + vc.TEXT_INPUT_MAX_LENGTH)
        .required(vc.FIELD_IS_REQUIRED),
    electricVehicleType: Yup.string()
        .required(vc.FIELD_IS_REQUIRED),
    topSpeed: Yup.number().typeError(vc.PLEASE_ENTER_NUMBER)
        .min(vc.MIN_TOP_SPEED, vc.FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN + vc.MIN_TOP_SPEED)
        .max(vc.MAX_TOP_SPEED, vc.FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN + vc.MAX_TOP_SPEED),
    acceleration: Yup.number().typeError(vc.PLEASE_ENTER_NUMBER)
        .min(vc.MIN_ACCELERATION, vc.FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN + vc.MIN_ACCELERATION)
        .max(vc.MAX_ACCELERATION, vc.FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN + vc.MAX_ACCELERATION),
    chargingTime: Yup.number().typeError(vc.PLEASE_ENTER_NUMBER)
        .min(vc.MIN_CHARGING_TIME, vc.FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN + vc.MIN_CHARGING_TIME)
        .max(vc.MAX_CHARGING_TIME, vc.FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN + vc.MAX_CHARGING_TIME)
        .required(vc.FIELD_IS_REQUIRED),
    nominalRange: Yup.number().typeError(vc.PLEASE_ENTER_NUMBER)
        .min(vc.MIN_NOMINAL_RANGE, vc.FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN + vc.MIN_NOMINAL_RANGE)
        .max(vc.MAX_NOMINAL_RANGE, vc.FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN + vc.MAX_NOMINAL_RANGE),
    passengers: Yup.number()
        .min(vc.MIN_PASSENGERS, vc.FIELD_VALUE_HAS_NOT_TO_BE_LESS_THAN + vc.MIN_PASSENGERS)
        .max(vc.MAX_PASSENGERS, vc.FIELD_VALUE_HAS_NOT_TO_BE_GREATER_THAN + vc.MAX_PASSENGERS),
})

