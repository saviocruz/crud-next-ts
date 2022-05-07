import styles from './SubmitButton.module.css'

function SubmitButton({ text }:any) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  )
}

export default SubmitButton
