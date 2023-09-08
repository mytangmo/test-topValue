import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table, Input, Button } from "antd";
import { AiOutlineSearch, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Qone() {
  useEffect(() => {
    getData();
  }, []);

  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);

  let urlData = "https://api.publicapis.org/categories";
  const getData = (query) => {
    (async () => {
      await axios.get(urlData).then((response) => {
        console.log(response.data);
        let res = response.data.categories;

        let filter = res.filter((item) =>
          item.toLowerCase().includes(query == undefined ? "" : query)
        );
        let arr = [];
        let i = 1;
        filter.forEach((el) => {
          let obj = { key: i++, categoryName: el };
          arr.push(obj);
        });
        setCategory(arr);
        setCount(arr.length);
      });
    })();
  };

  const filterData = (e) => {
    let searchTxt = e.target.value;
    let query = searchTxt.toLowerCase();
    getData(query);
  };

  const columns = [
    {
      title: <b>Category Name</b>,
      dataIndex: "categoryName",
      key: "1",
    },
  ];
  return (
    <div className="column-center">
      <Link to={{ pathname: "/two" }} style={{ padding: "10px" }}>
        <Button icon={<AiOutlineArrowRight />}>Question Two</Button>
      </Link>
      <Input
        placeholder="find category"
        style={{ width: "50vw" }}
        onChange={filterData}
        suffix={<AiOutlineSearch />}
      />
      <b className="count">
        {count} {count == 1 || count == 0 ? "item" : "items"}
      </b>
      <Table
        columns={columns}
        dataSource={category}
        style={{ width: "80%" }}
        bordered
      />
    </div>
  );
}
