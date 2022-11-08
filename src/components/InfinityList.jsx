import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { SearchContext } from "./Layout";
import { useContext } from "react";

const InfinityList = (props) => {
  const listRef = useRef(null);

  const [data, setData] = useState(props.data);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const searchValue = useContext(SearchContext);
  console.log(searchValue);

  useEffect(() => {
    setData(props.data);
    console.log(props.data);
  }, [props.data]);

  useEffect(() => {
    console.log(searchValue);
    setData(searchValue);
  }, [searchValue]);

  //Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {6 > 0 &&
          currentProducts &&
          currentProducts?.map((item, index) => (
            <ProductCard
              key={index}
              img01={
                item.images &&
                item.images.length > 0 &&
                item.images[0]?.imageUrl
              }
              img02={
                item.images && item.images[1] && item.images[1]?.imageUrl
                  ? item.images[1]?.imageUrl
                  : item.images[0]?.imageUrl
              }
              name={item.productName}
              price={item.productDetails[0].price}
              slug={item.productId}
            />
          ))}
      </Grid>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
