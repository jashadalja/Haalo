import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import polyline from 'polyline';
import 'leaflet/dist/leaflet.css';

// Fix for the default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const SelectLocation = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [routeLine, setRouteLine] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    // Setting up default icon
    let DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialize the map only once
    const leafletMap = L.map(mapRef.current).setView([23.0225, 72.5714], 13); // Ahmedabad coordinates

    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap);

    setMap(leafletMap);

    // Clean up on component unmount
    return () => {
      leafletMap.remove();
    };
  }, []);

  const reverseGeocode = (lat, lng, setInput) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setInput(data.display_name))
      .catch(error => {
        console.error('Error in reverseGeocode:', error.message);
        setInput('Error fetching address');
      });
  };

  useEffect(() => {
    if (map) {
      const handleMouseMove = (e) => {
        clearTimeout(hoverTimeout);
        setHoverTimeout(setTimeout(() => {
          if (!marker) {
            reverseGeocode(e.latlng.lat, e.latlng.lng, setNewAddress);
          }
        }, 500));
      };

      const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        if (marker) {
          marker.setLatLng([lat, lng]);
          reverseGeocode(lat, lng, setAddress);
        } else {
          const newMarker = L.marker([lat, lng]).addTo(map);
          setMarker(newMarker);
          reverseGeocode(lat, lng, setAddress);
        }
        if (routeLine) {
          map.removeLayer(routeLine);
        }
      };

      map.on('mousemove', handleMouseMove);
      map.on('click', handleClick);

      return () => {
        map.off('mousemove', handleMouseMove);
        map.off('click', handleClick);
      };
    }
  }, [map, marker, hoverTimeout, routeLine]);

  const addNewMarker = () => {
    if (!newAddress) {
      alert('Please enter a new location address.');
      return;
    }

    if (!marker) {
      alert('Please click on the map to set the initial marker.');
      return;
    }

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(newAddress)}`;
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          alert('Address not found.');
          return;
        }

        const newLatLng = [data[0].lat, data[0].lon];
        if (newMarker) {
          map.removeLayer(newMarker);
        }

        const marker = L.marker(newLatLng).addTo(map);
        setNewMarker(marker);
        setNewAddress(data[0].display_name);
      })
      .catch(error => {
        console.error('Error in addNewMarker:', error.message);
        alert('Error fetching new address.');
      });
  };

  const getRoute = () => {
    if (!marker || !newMarker) {
      alert('Both markers need to be set before getting a route.');
      return;
    }

    const startLatLng = marker.getLatLng();
    const endLatLng = newMarker.getLatLng();

    const routeUrl = `https://router.project-osrm.org/route/v1/driving/${startLatLng.lng},${startLatLng.lat};${endLatLng.lng},${endLatLng.lat}?overview=full`;

    fetch(routeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.routes.length > 0) {
          const encodedPolyline = data.routes[0].geometry;
          if (routeLine) {
            map.removeLayer(routeLine);
          }

          // Decode the polyline
          const decodedPoints = polyline.decode(encodedPolyline).map(point => L.latLng(point[0], point[1]));

          // Create a polyline layer from the decoded points
          const line = L.polyline(decodedPoints, { color: 'blue' }).addTo(map);
          setRouteLine(line);
          map.fitBounds(L.latLngBounds([startLatLng, endLatLng])); // Adjust map view to show both markers
        } else {
          alert('Route not found.');
        }
      })
      .catch(error => {
        console.error('Error in getRoute:', error.message);
        alert('Error fetching route.');
      });
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={{ height: '500px' }}></div>
      <input
        type="text"
        id="address"
        value={address}
        placeholder="Hover over a place on the map"
        readOnly
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <input
        type="text"
        id="new-address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        placeholder="Enter new location"
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={addNewMarker}>Add Marker</button>
      <button onClick={getRoute}>Get Route</button>
    </div>
  );
};

export default SelectLocation;
