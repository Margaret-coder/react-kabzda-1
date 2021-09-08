import { useEffect, useRef } from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

const FormControl = ({input, meta: {touched, error}, children}) => {
  const hasError = touched && error
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>
        {children}
      </div>
      {hasError&&<span>{error}</span>}
    </div>
  )
}

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

export const Input = ({ input, meta, ...props }) => {
    let hasError = meta.touched && meta.error;
    if(props.type === "file"){
      return( 
        <div>
          {/* <input {...props}/> */}
          <input onChange={props.function.fileHandler} {...props}/>

        </div>
    )
}
else{
    return (
      <div className={hasError ? styles.error : ""}>
        <div>
          <input {...input} {...props} />
        </div>
        {hasError && <span>{meta.error}</span>}
        {props.type === "file" && console.log('props', props)}
        {props.type === "file" && console.log('input', input)}
        {/* {props.type === "file" && console.log('meta', meta)} */}
      </div>
    );
    }  
};

export const FileInput = ({value, ...rest}) => {
  const inputRef = useRef()

  useEffect(() => {
    if(value === ""){
      inputRef.current.value=""
    }
    else {
      inputRef.current.files = value
    }
  }, [value])
  
  return <input {...rest} type= "file" ref={inputRef}/>
} 

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
  return(
  <div>
    <Field placeholder={placeholder} name={name} 
        validate={validators} 
        component={component}
        {...props}
      /> {text}
  </div> 
)}

export const createFieldsArray = (header, arrayName,  placeholders, fieldNames, component) => {
  var rows = [];
    for (var i = 0; i < fieldNames.length; i++) {
      rows.push(<li key={i} >{createField(placeholders[i], `${arrayName}.${fieldNames[i]}`, [], component)}</li>);
    }
    // console.log('ROWS', rows)
    return (
    <div>
      <h3>{header}:</h3>
      <ul>
        {rows}
      </ul>
    </div>)
}
