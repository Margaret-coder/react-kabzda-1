import { useEffect, useRef } from "react";
import { Field } from "redux-form";
import { required } from "../../../utils/validators/validators";
import styles from "./FormControls.module.css";

export const Textarea = ({ input, meta, ...props }) => {
  let hasError = meta.touched && meta.error;
  // let hasError = !props.value && meta.error;
  return (
    <div className={hasError ? styles.error : ""}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input = (data) => {
    const { input, meta, ...props } = data
    // let hasError = meta.touched && meta.error;
    // console.log('---props.value', props.value)
    // console.log('---meta.error', meta.error)
    // console.log('meta.touched', meta.touched)
    const hasError = meta.error&&meta.touched ;
    // console.log('hasError', hasError)
    if(props.type === "file"){
      return( 
        <div>
          <input onChange={props.onChange} {...props}/>
        </div>
    )
  }
  else{
    meta.pristine = false
    meta.dirty = true
    meta.valid = true
    meta.visited = true
    meta.initial = ''
    meta.touched = true
    if(input.name === 'contacts.phone' || input.name === 'contacts.address'){
      return (
        <div className={hasError ? styles.error : ""}>
          <div>
            <input  meta={meta}{...input} {...props} />
          </div>
          {hasError && <span>{meta.error}</span>}
        </div>
      );
    }
    else {
      meta.pristine = false
      meta.dirty = true
      meta.valid = true
      meta.visited = true
      meta.initial = ''
      meta.touched = true
      // console.log('!!!hasError', hasError)
      if(input.name==="fullname"){
        console.log('!!!input:::', <input {...input} {...props}/>)
      }
      // console.log('!!!meta', meta)
      return (
          <div className={hasError ? styles.error : ""}>
            <div>
              <input {...input} {...props} 
              onFocus = {props.onFocus}
              // onFocus = {(e) => {console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')}}
              />
            </div>
            {hasError && <span>{meta.error}</span>}
          </div>
      )
    }
  }  
};

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
  // if(name==="fullname"){
  //   console.log('Create Field::: Field Validate={validators}')
  //   console.log('FIELD:::', <Field props={props} placeholder={placeholder} name={name}
  //   component={component}
  //   /> )
  // } 
  console.log('VALIDATORS', validators)
  return(
  <div>
    <Field props={props} placeholder={placeholder} name={name} 
        validate={validators} component={component}
      /> {text}
  </div> 
)}

export const createFieldsArray = (header, arrayName, placeholders, fieldNames, component, props) => {
  var rows = [];
    for (var i = 0; i < fieldNames.length; i++) {
      rows.push(<li key={i} >
        {createField(placeholders[i], 
        `${arrayName}.${fieldNames[i]}`, 
        [], component, props[i])}</li>);
    }
    return (
    <div>
      <h3>{header}:</h3>
      <ul>
        {rows}
      </ul>
    </div>)
}
