import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref,onClickOutside) {
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
    const { onClick } = props;
    const wrapperRef = useRef(null);

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onClick(event)
        }
    }

    useOutsideAlerter(wrapperRef,handleClickOutside);
    return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired
};

export default OutsideAlerter;
