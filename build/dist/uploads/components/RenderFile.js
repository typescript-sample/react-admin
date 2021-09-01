import * as React from 'react';
var RenderItem = function (props) {
    if (props.item.source === 'youtube' && props.item.type === 'video') {
        return (React.createElement("div", { className: 'col xl11 l11 m11 s11' },
            React.createElement("div", { className: 'data-item' },
                React.createElement("iframe", { width: '338', height: '190', src: props.item.url, title: 'YouTube video player', allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;' }))));
    }
    else if (props.item.source === 'google-storage' && props.item.type === 'video') {
        return (React.createElement("div", { className: 'col xl11 l11 m11 s11' },
            React.createElement("div", { className: 'data-item' },
                React.createElement("video", { controls: true, width: '338', height: '190', className: 'video-uploaded', src: props.item.url }))));
    }
    else {
        return (React.createElement("div", { className: 'col xl11 l11 m11 s11' },
            React.createElement("div", { className: 'data-item' },
                React.createElement("img", { className: 'image-uploaded', src: props.item.url, alt: 'image-uploads' }))));
    }
};
export default RenderItem;
//# sourceMappingURL=RenderFile.js.map