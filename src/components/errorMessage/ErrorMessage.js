import errorImg from './error.gif'
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <img className='error__message' src={errorImg} alt='error'/>
  )
}

export default ErrorMessage;