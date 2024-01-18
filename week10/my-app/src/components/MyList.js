import React from 'react'

    function MyList(props) {
        const items = props.items;
        
        const listItems = items.map((item) =>
            <li key={item.id} onClick={() =>props.updateItem(item.id)} style={{textDecoration: item.clicked ? "line-through":""}}>{item.text}</li>
        );

        return (
        <div>
            <header>{props.header}</header>
            <ol>{listItems}</ol>
        </div>
        )

    }

export default MyList