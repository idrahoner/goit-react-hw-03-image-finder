import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ hits, onClick }) {
  return (
    <ul className={css.imageGallery}>
      {hits.map(element => (
        <ImageGalleryItem
          key={element.id}
          id={element.id}
          webImage={element.webformatURL}
          description={element.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};
