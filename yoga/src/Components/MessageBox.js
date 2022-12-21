import React from 'react'

export default function MessageBox(props) {
    return (
        <div className={`alert alert-${props.variant || 'info'} my-2`} style={{ margin: "3rem 1rem 2rem 1rem" }}>
            {props.children}
        </div>
    )
}
