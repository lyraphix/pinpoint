function LeftArrow(props) {
    return (
        <div className="arrow leftArrow" onClick={props.scrollLeft}>
        &lt;  {/* This is the less than symbol which looks like an arrow */}
        </div>
    );
}

export default LeftArrow;