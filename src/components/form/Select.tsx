import styles from './Select.module.css'

function Select({ text, name, options, handleOnChange, value }: any) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
      <option>Selecione uma opção</option>
      
      {options.length === 0 ? (

        <div>
        {options.map( (option:any) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </div>
      )      : (
        <option>Selecione uma opção</option>
      )}
      </select>
    </div>
  )
}

export default Select
