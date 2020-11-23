import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { TableRow, TableCell, Switch } from "@material-ui/core";

const TestTrainees = () => {
  const [name, setName] = useState("React");
  const [students, setStudents] = useState([
    {
      ROLLNO: 2344,
      STNAME: "Jones",
    },
    {
      ROLLNO: 12200,
      STNAME: "James",
    },
    {
      ROLLNO: 1289,
      STNAME: "Jane",
    },
    {
      ROLLNO: 12,
      STNAME: "Peter",
    },
  ]);

  const [switchState, setSwitchState] = useState({});

  const handleChange = (index, event, checked) => {
    const list = Object.assign({}, switchState);

    list["switch-" + index] = checked;

    setSwitchState(list);
  };

  const setDynamicSwitchState = (list) => {
    if (!list) {
      return;
    }

    const switchState = {};

    list.forEach((item, index) => {
      switchState["switch-" + index] = false;
    });

    setSwitchState(switchState);
  };

  useEffect(() => {
    setDynamicSwitchState(students);
  });

  const studentss = students.map((post, i) => (
    <TableRow key={i} className="tblFont">
      <TableCell scope="row">{post.ROLLNO}</TableCell>
      <TableCell>{post.STNAME}</TableCell>
      <TableCell>
        <Switch
          key={i}
          checked={switchState["switch-" + i]}
          onChange={(event, checked) => handleChange(i, event, checked)}
          value="checkedB"
          color="primary"
        />
      </TableCell>
    </TableRow>
  ));

  return <div>{studentss}</div>;
};

export default TestTrainees;
