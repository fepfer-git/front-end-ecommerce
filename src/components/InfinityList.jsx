import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

const InfinityList = (props) => {
  const perLoad = 6; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState(props.data);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data);
    console.log(props.data);
    setIndex(1);
  }, [props.data]);

  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       if (listRef && listRef.current) {
  //         if (
  //           window.scrollY + window.innerHeight >=
  //           listRef.current.clientHeight + listRef.current.offsetTop + 200
  //         ) {
  //           console.log("bottom reach");
  //           setLoad(true);
  //         }
  //       }
  //     });
  //   }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.length > 0 &&
          data.map((item, index) => (
            <ProductCard
              key={index}
              img01={
                item.images && item.images.length > 0 && item.images[0].imageUrl
              }
              img02={
                item.images && item.images[1] && item.images[1].imageUrl
                  ? item.images[1].imageUrl
                  : item.images[0].imageUrl
              }
              name={item.productName}
              price={item.productDetails[0].price}
              slug={item.productId}
            />
          ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
