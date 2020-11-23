import React, { forwardRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import InternalTrainingCostReport from "../reports/InternalTrainingCostReport";

const HandlePrint = () => {
  const componentRef = forwardRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <InternalTrainingCostReport ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default HandlePrint;
