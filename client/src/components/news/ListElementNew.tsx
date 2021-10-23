import React, { FunctionComponent, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    title: string;
    url: string;
    time: string;
    id: string;
    author: string;
    onRemove: (id: string) => void;
}

const ListElementNew: FunctionComponent<Props> = (props) => {

    function removeItem(e: any) {
        e.preventDefault();
        props.onRemove(props.id);
    }

    return (
        <div className="list-element-news"  >
            <div className="cont-title">
                <p className="p-title" >{props.title}</p>
                <span className="p-author" >- {props.author} - </span>
            </div>
            {/* <div className="cont-author">
            </div> */}
            <div className="cont-time">
                <p>{props.time}</p>
            </div>
            <div className="cont-actions">
                <button onClick={removeItem} className="btn btn-icon" >
                    <span className="material-icons">delete</span>
                </button>
            </div>
        </div>
    )
}

export default ListElementNew;
