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