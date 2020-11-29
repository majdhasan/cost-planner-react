import React from 'react'
import { Button } from 'reactstrap';

function FloatingButton({ content, onClick }) {
    return (
        <div style={{ borderRadius: 50, position: "fixed", bottom: 40, right: 40 }}>
            <Button color="success" onClick={onClick}>
                {content}
            </Button>
        </div>
    )
}

export { FloatingButton }
