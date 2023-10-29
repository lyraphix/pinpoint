function RightArrow(props) {
    return (
      <div className="arrow rightArrow" onClick={props.scrollRight}>
        &gt;  {/* This is the greater than symbol which looks like an arrow */}
      </div>
    );
}
  
export default RightArrow;