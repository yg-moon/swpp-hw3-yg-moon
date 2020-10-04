import React from 'react';

const Article = props => {
    return (
       <div className='Article'>
            ID: {props.id}
            <div className="Title" onClick={props.clicked}>
                Title: {props.title}
            </div>
            <div className="Author">
                Author: {props.author}
            </div>
            <div className="LineBreak">
                <br></br>
            </div>
            
        </div>
    );
}
export default Article;