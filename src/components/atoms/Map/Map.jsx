import React from 'react';
import './Map.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map({ lat, long }) {
  return (
    <div className="map">
      <MapContainer className="map__container" center={[lat, long]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
