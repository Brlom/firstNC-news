import React from "react";

const Home = () => {
    return (
        <React.Fragment>
            <img id="NC-classroom" src="https://northcoders.com/images/general/index/javascript-course-leeds-adie-teaching.jpg" alt="Northcoders classroom" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="200" width="200" />
            <img id="code" src="https://www.thoughtco.com/thmb/DF3Q0T5_0O5CmGBTCWCBTcyGgmw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/JavaScript-58acbb8a3df78c345bad32c2.jpg" alt="random code" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="200" width="200" />
            <img id="NC-heart" src="https://northcoders.com/images/general/index/coding-bootcamp-northcoders-manchester-heart-wall.jpg" alt="Northcoders heartwall with student pictures" onError={(e) => { e.target.onerror = null; e.target.src = "http://customerservicelife.com/wp-content/uploads/2015/07/pigsfly.jpg" }} height="200" width="200" />
            <h2>Welcome to Northcoders News!</h2>
        </React.Fragment>
    )
}

export default Home;
