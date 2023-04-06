import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagInputComponent = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div style={{width:'100%',overflowX:'auto'}}>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="PhoneNo."
        placeHolder="Type Phone Number"
      />
     
    </div>
  );
};
export default TagInputComponent;