import React from 'react'
import { useField } from 'formik'
import { FormField } from 'semantic-ui-react'

export default function KodlamaIoDropdown({...props}) {
    const [field,meta] = useField(props)
    return (
        <FormField error={meta.touched && !!meta.error}>
           <input {...field} {...props} />
           <Form.Select
            fluid
            {...field} {...props}
          />
           {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
           ):null}
        </FormField>
    )
}
