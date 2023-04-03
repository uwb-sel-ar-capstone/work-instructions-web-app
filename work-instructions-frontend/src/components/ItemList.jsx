import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

const ItemList = ({}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:5000/api/v1/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
      })
      .catch(err => console.log(err));
    });

    return (
        <div className="List">
          <h5 className="heading">Title: <b> Item List</b></h5>
          <div className="itemDisplayBox">
            <div className = "buttonStyle">
                {items.map((item) => {
                    return  <div className = "buttonStyle">
                      <Button variant="contained"
                        onClick={() => {
                            console.log("clicked");
                        }}
                      >{item.name}</Button>
                    </div>
                })}
            </div>
          </div>
        </div>
      );
};

export default ItemList;