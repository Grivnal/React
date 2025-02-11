import React from "react";

class ClassComponent extends React.Component {
    render() {
        const { text = "Default text" } = this.props;

        return (
            <h1>{text}</h1>
        );
    }
};

export default ClassComponent;