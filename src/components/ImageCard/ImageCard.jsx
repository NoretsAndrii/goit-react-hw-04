import css from './ImageCard.module.css';

export default function ImageCard({ image }) {
  return (
    <div className={css.item}>
      <img src={image.urls.small} alt="" data-large={image.urls.regular} />
    </div>
  );
}
