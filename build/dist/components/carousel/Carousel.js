import * as React from 'react';
import '../../assets/css/carousel.css';
export default function Carousel(props) {
    var children = props.children, infiniteLoop = props.infiniteLoop;
    var widthItem = React.useRef(0);
    var counter = React.useRef(null);
    var slidersLength = React.useRef(0);
    var touchPosition = React.useRef(null);
    var slider = React.useRef(null);
    var sliderContainer = React.useRef(null);
    var typingTimeoutRef = React.useRef(null);
    React.useEffect(function () {
        infiniteLoop ? counter.current = 1 : counter.current = 0;
        window.addEventListener('resize', handleWidth);
        handleWidth();
        return function () {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    var handleWidth = function () {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(function () {
            var slideItems = sliderContainer.current.children;
            slidersLength.current = slideItems.length;
            widthItem.current = slider.current.offsetWidth;
            Array.from(slideItems).forEach(function (item) {
                item.style.width = slider.current.offsetWidth + 'px';
            });
            sliderContainer.current.style.width =
                widthItem.current * slidersLength.current + 'px';
            sliderContainer.current.style.transition = 'transform 0.4s ease-in-out';
            sliderContainer.current.style.transform =
                'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        }, 200);
    };
    var handleTransitionEnd = function () {
        if (sliderContainer.current.children[counter.current].id === 'lastClone') {
            sliderContainer.current.style.transition = 'none';
            counter.current = slidersLength.current - 2;
            sliderContainer.current.style.transform =
                'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        }
        if (sliderContainer.current.children[counter.current].id === 'firstClone') {
            sliderContainer.current.style.transition = 'none';
            counter.current = slidersLength.current - counter.current;
            sliderContainer.current.style.transform =
                'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        }
    };
    var prev = function () {
        console.log(counter.current);
        if (counter.current <= 0) {
            return;
        }
        sliderContainer.current.style.transition = 'transform 0.4s ease-in-out';
        counter.current--;
        sliderContainer.current.style.transform =
            'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        clearVideo();
    };
    var next = function () {
        if (counter.current >= slidersLength.current - 1) {
            return;
        }
        sliderContainer.current.style.transition = 'transform 0.4s ease-in-out';
        counter.current++;
        sliderContainer.current.style.transform =
            'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        clearVideo();
    };
    var handleDots = function (index) {
        if (infiniteLoop) {
            index++;
        }
        if (counter.current !== index) {
            counter.current = index;
            sliderContainer.current.style.transition = 'transform 0.4s ease-in-out';
            sliderContainer.current.style.transform =
                'translate3d(' + -widthItem.current * counter.current + 'px, 0px, 0px)';
        }
        clearVideo();
    };
    var handleTouchStart = function (e) {
        var touchDown = e.touches[0].clientX;
        touchPosition.current = touchDown;
    };
    var handleTouchMove = function (e) {
        var touchDown = touchPosition.current;
        if (touchDown === null) {
            return;
        }
        var currentTouch = e.touches[0].clientX;
        var diff = touchDown - currentTouch;
        if (diff > 5) {
            next();
        }
        if (diff < -5) {
            prev();
        }
        touchPosition.current = null;
    };
    var clearVideo = function () {
        var tagVideo = sliderContainer.current.querySelector('.slider-items > video');
        if (tagVideo) {
            sliderContainer.current.querySelector('.slider-items > video').remove();
        }
    };
    return (React.createElement("div", { className: 'slider', ref: slider },
        React.createElement("span", { id: 'btn-prev', onClick: prev }, "<"),
        React.createElement("span", { id: 'btn-next', onClick: next }, ">"),
        React.createElement("div", { className: 'slider-content-wrapper', onTouchStart: handleTouchStart, onTouchMove: handleTouchMove },
            React.createElement("div", { className: 'slider-container', ref: sliderContainer, onTransitionEnd: function () { return handleTransitionEnd(); } },
                infiniteLoop &&
                    React.createElement("div", { className: 'slider-items', id: 'lastClone' }, children[children.length - 1]),
                children.map(function (item, index) { return (React.createElement("div", { className: 'slider-items', key: "slider-items-" + index }, item)); }),
                infiniteLoop &&
                    React.createElement("div", { className: 'slider-items', id: 'firstClone' }, children[0])))));
}
//# sourceMappingURL=Carousel.js.map