import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Display = () => {
  const [transactions, settransactions] = useState([]);
  const [customers, setcustomers] = useState([]);
  const [filteredTrans, setfilteredTrans] = useState([]);
  let navigate = useNavigate();

  async function getData() {
    await axios
      .get("/data.json")
      .then(
        (response) => (
          settransactions(response.data?.transactions),
          setcustomers(response?.data.customers),
          setfilteredTrans(response.data?.transactions)
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }

  function filterbyName(name) {
    let filteredData = customers?.filter((ele) =>
      ele?.name?.toLowerCase().includes(name.toLowerCase())
    );
    setcustomers(filteredData);
  }

  function filterAmount(searchValue) {
    if (searchValue == "asc") {
      transactions?.sort((a, b) => a.amount - b.amount);
      setfilteredTrans([...transactions?.sort((a, b) => a.amount - b.amount)]);
    } else if (searchValue == "des") {
      setfilteredTrans([...transactions?.sort((a, b) => b.amount - a.amount)]);
    } else if (searchValue == "") {
      setfilteredTrans([...transactions]);
    } else {
      setfilteredTrans([
        ...transactions?.filter((ele) => ele.amount <= searchValue),
      ]);
    }
  }

  function getChart(id) {
    const user = transactions.filter((ele) => ele.customer_id === id);
    const data = customers.find((ele) => ele.id == id);
    return navigate("/Chart", { state: { user, name: data.name } });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <input
          className="form-control  w-50"
          placeholder="search by name"
          type="text"
          onChange={(e) => {
            filterbyName(e.target.value);
          }}
        />

        <input
          list="sort"
          name="sort"
          id="browsersortamount"
          className="form-select w-50 cursor-pointer"
          placeholder="enter amount to search"
          onChange={(e) => {
            filterAmount(e.target.value);
          }}
        />
        <datalist id="sort">
          <option value="asc" />
          <option value="des" />
        </datalist>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrans.length > 0
              ? filteredTrans?.map((ele) =>
                  customers.map((element) =>
                    ele.customer_id === element.id ? (
                      <tr
                        onClick={() => {
                          getChart(ele.customer_id);
                        }}
                      >
                        <th scope="row">{ele.customer_id}</th>
                        <td>{element.name}</td>
                        <td>{ele.amount}</td>
                        <td>{ele.date}</td>
                      </tr>
                    ) : null
                  )
                )
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Display;
