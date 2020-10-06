import React from 'react';

const Article = props => {
    return (
       <div className='Article'>
            ID: {props.id} <br></br>
            <button id="article-title" onClick={props.clicked}>
                {props.title}
            </button>
            <div className="Author">
                {props.author}
            </div>
            <div className="LineBreak">
                <br></br>
            </div>
            
        </div>
    );
}
export default Article;