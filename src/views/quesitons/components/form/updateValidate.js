import { useField, useForm} from 'vee-validate'
import * as yup from 'yup';

export default function () {
    const { value: img, errorMessage: errorImg} = useField('img')
    const { value: description, errorMessage: errorDescription} = useField('description')
    

    
    const { errors, validate, values } = useForm({
        validationSchema: 
            yup.object({
            img: yup.string(),
            description: yup.string().required(),            
        })
    })

    return {
        img,
        errorImg,
        description,
        errorDescription,
        validate,
        errors,        
        values         
    }
}
    
