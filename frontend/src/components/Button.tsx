type ButtonProps = {
  onClick: () => void
  text: string
  id?: string
  classes?: string
}

function Button({ onClick, text, id, classes }: ButtonProps) {
  return (
    <input
      id={id}
      className={'button ' + classes}
      type="button"
      onClick={onClick}
      value={text}
    />
  )
}

export default Button
