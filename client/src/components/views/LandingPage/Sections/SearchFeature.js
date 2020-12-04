import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

export default function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");

  const handleChange = (e) => {
    setSearchTerms(e.currentTarget.value);

    // update the parent state and UI
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <div className="form-group">
      <input
        className="form-control"
        value={SearchTerms}
        onChange={handleChange}
        placeholder="Search products name..."
      />
    </div>
  );
}
