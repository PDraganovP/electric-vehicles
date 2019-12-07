import * as Yup from 'yup';
import { ValidationConstants as vc } from '../../application-constants/AppConstants';
export const formSchema = Yup.object().shape({
    username: Yup.string()
        .min(vc.TEXT_INPUT_MIN_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_LESS_THAN + vc.TEXT_INPUT_MIN_LENGTH)
        .max(vc.TEXT_INPUT_MAX_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_GREATER_THAN + vc.TEXT_INPUT_MAX_LENGTH)
        .required(vc.FIELD_IS_REQUIRED),
    password: Yup.string()
        .min(vc.TEXT_INPUT_MIN_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_LESS_THAN + vc.TEXT_INPUT_MIN_LENGTH)
        .max(vc.TEXT_INPUT_MAX_LENGTH, vc.FIELD_LENGTH_HAS_NOT_TO_BE_GREATER_THAN + vc.TEXT_INPUT_MAX_LENGTH)
        .required(vc.FIELD_IS_REQUIRED),
})
