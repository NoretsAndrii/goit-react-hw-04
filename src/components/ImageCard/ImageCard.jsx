import css from './ImageCard.module.css';

export default function ImageCard({ image }) {
  return (
    <div className={css.item}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        data-large={image.urls.regular}
      />
      <div className={css.box}>
        <p className={css.text}>
          Author: <span className={css.span}>{image.user.name}</span>
        </p>
        <p className={css.text}>
          likes: <span className={css.span}>{image.likes}</span>
        </p>
      </div>
    </div>
  );
}
