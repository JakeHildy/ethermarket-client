import React, { useRef, useEffect } from 'react';
import './MapEdit.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapEdit({ lat, long, onMarkerMoved }) {
  const markerMoved = (e) => {
    onMarkerMoved(e.target._latlng);
  };

  return (
    <div className="map-edit">
      <MapContainer className="map__container" center={[lat, long]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]} draggable={true} eventHandlers={{ dragend: markerMoved }}>
          <Popup>Sell Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapEdit;
