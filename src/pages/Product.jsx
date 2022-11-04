import React from "react";
import { useEffect, useState } from "react";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import { getProductById } from "../services/ProductService";
import { getAllRatingByProductId } from "../services/RatingService";

import Comment from "../components/Comment";

const Product = (props) => {
  //   const product = productData.getProductBySlug();

  const [product, setProduct] = useState();
  const [productRatings, setProductRatings] = useState();
  //   const relatedProducts = productData.getProducts(8);

  useEffect(() => {
    getProductById(props.match.params.slug)
      .then((result) => {
        setProduct(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = () => {
    getAllRatingByProductId(props.match.params.slug)
      .then((result) => {
        setProductRatings(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(productRatings);
  console.log(product);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product && product.productName}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Comment
        fetchRating={fetchRating}
        rating={productRatings}
        productId={product?.productId}
      ></Comment>
      {/* <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section> */}
    </Helmet>
  );
};

export default Product;
