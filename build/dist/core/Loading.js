import * as React from 'react';
export var Loading = function (props) {
    var loadingStyle = {
        top: '30%',
        backgroundColor: 'white',
        border: 'none',
        'WebkitBoxShadow': 'none',
        'boxShadow': 'none'
    };
    if (props.error) {
        return React.createElement('div', {}, 'Error Load Module!');
    }
    else {
        return (React.createElement("div", { className: 'loader-wrapper' },
            React.createElement("div", { className: 'loader-sign', style: loadingStyle },
                React.createElement("div", { className: 'loader' }))));
    }
};
//# sourceMappingURL=Loading.js.map