import React from "react";
import GoogleMapReact from "google-map-react";
import pin from "./pin.png";
import { Link } from "react-router-dom";

const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)",
};

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 24.860966,
      lng: 66.990501,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "28vh", width: "108%", marginLeft: "-4% " }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA16d9FJFh__vK04jU1P64vnEpPc3jenec",
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.locations.map((item) => {
            if (item.address.length !== 0) {
              return item.address.map((i) => {
                return (
                  <Link to={"/" + item.name} key={i.id} lat={i.lat} lng={i.lng}>
                    <img style={markerStyle} src={pin} alt="pin" />
                  </Link>
                );
              });
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
