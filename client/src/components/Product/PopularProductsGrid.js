
import PopularProductCard from './PopularProductCard';
import Slider from "react-slick";

const PopularProductsGrid = ({ products }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (

    <Slider {...settings}>
      {products.map((product) => (
        <PopularProductCard key={product.id} product={product} />
      ))}
    </Slider>

  );
};

export default PopularProductsGrid;
