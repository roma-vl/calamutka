import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RecommendedProductCard from './RecommendedProductCard';

const RecommendedProductsSlider = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <RecommendedProductCard key={index} product={product} />
      ))}
    </Slider>
  );
};

export default RecommendedProductsSlider;
