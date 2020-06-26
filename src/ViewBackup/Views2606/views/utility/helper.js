<<<<<<< HEAD
const convertLatLngToObj = (lat, lng) => {
  return {
    lat,
    lng
  };
};

const createLatLngObject = latLng => {
  const latLngArray = latLng.split(",");
  return {
    lat: latLngArray[0],
    lng: latLngArray[1]
  };
};

const createLocationObject = (
  from,
  fromTitle,
  to,
  toTitle,
  strokeColor = "#f68f54"
) => {
  return {
    from: { ...createLatLngObject(from), fromTitle },
    to: { ...createLatLngObject(to), toTitle },
    strokeColor: strokeColor
  };
};

export { convertLatLngToObj, createLocationObject, createLatLngObject };
=======
const convertLatLngToObj = (lat, lng) => {
  return {
    lat,
    lng
  };
};

const createLatLngObject = latLng => {
  const latLngArray = latLng.split(",");
  return {
    lat: latLngArray[0],
    lng: latLngArray[1]
  };
};

const createLocationObject = (
  from,
  fromTitle,
  to,
  toTitle,
  strokeColor = "#f68f54"
) => {
  return {
    from: { ...createLatLngObject(from), fromTitle },
    to: { ...createLatLngObject(to), toTitle },
    strokeColor: strokeColor
  };
};

export { convertLatLngToObj, createLocationObject, createLatLngObject };
>>>>>>> a88a71bcc8a2ff119afff3f4c5e7a23f0e88acee
