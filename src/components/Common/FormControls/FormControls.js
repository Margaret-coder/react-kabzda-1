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

export const createFieldsArray = (header, name, formName, placeholders, names, components) => {
  console.log(placeholders)
  console.log(names)
  console.log(components)
  var rows = [];
  for (var i = 0; i < 2; i++) {
    // rows.push(<div key={i} >{createField(placeholders[i], names[i], components[i])}</div>);
    rows.push(<div key={i} >{createField(placeholders[i], names[i], [], components[i], formName)}</div>);
  }
  console.log('ROWS', rows)
  return <div>
    <h3>{header}:</h3>
      <div name={name}>{rows}</div>
    </div>;
}
