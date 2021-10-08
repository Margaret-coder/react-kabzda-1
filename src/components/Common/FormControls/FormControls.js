import { useEffect, useRef } from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

export const Textarea = ({ input, meta, ...props }) => {
  let hasError = meta.touched && meta.error;
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
  const hasError = meta.error&&meta.touched ;
    return (
    <div className={hasError ? styles.error : ""}>
      <div>
        <input {...input} {...props}
        />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
    )
}  

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
  return(
  <div>
    <Field props={props} placeholder={placeholder} name={name} 
        validate={validators} component={component}
      /> {text}
  </div> 
  )
}

export const createFieldsArray = (header, arrayName, placeholders, fieldNames, validators, component, props) => {
  var rows = [];
  for (var i = 0; i < fieldNames.length; i++) {
    rows.push(
    <div key={i} >
      {createField(placeholders[i], 
      fieldNames[i], 
      validators[i], component, props[i])}
    </div>
    );
  }
  return (
  <div>
    <h3>{header}:</h3>
    <ul>
      {rows}
    </ul>
  </div>)
}

