import { useField, useForm} from 'vee-validate'
import * as yup from 'yup';

export default function () {
    const { value: searchText, errorMessage: errorSearchText } = useField('searchText')

    
    const { errors, validate, values } = useForm({
        validationQuesitons: 
        yup.object({
          searchText: yup.string()
        })
    })


    return {
        searchText,
        validate,
        errors,
        errorSearchText,
        values         
    }
}
    
