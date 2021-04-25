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
    return (
      <div className={hasError ? styles.error : ""}>
        <div>
          <input {...input} {...props} />
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
    );
};

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