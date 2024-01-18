import React, {useState} from 'react'
import MyList from './MyList'

function MyContainer(){
    
    const [items, setItems] = useState([
        {id: "1", text: "This is an item", clicked: false},
    ])
    console.log(items);
    const updateItem = (itemId) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, clicked: !item.clicked } : item
            )
        )
        }
        
    
    
    
    return (
        <div>
            
            <textarea ></textarea>
            <button onClick={() => setItems([...items,{id: (items.length+1).toString(), text: document.querySelector('textarea').value, clicked: false}])}>Add Item</button>
            <MyList 
                updateItem={updateItem}
                items={items}
                header = "Really epic list component"/>
        </div>)
    }



export default MyContainer
