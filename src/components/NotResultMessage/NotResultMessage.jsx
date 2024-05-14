import { ImSad } from 'react-icons/im';
import css from './NotResultMessage.module.css';

export default function NotResultMessage() {
  return (
    <div className={css.message}>
      <ImSad size={100} color="red" />
      <p>Whoops, no results were found for your request!</p>
    </div>
  );
}
