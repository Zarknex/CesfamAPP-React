import React from "react";
import background from "./BG_INICIO.png";

class Home extends React.Component {

    render() {
        return (
                <div style={{ backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"
                }}>sex</div>
        )
    }
}

export default Home;