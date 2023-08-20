import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";
import { useGet } from "@utils/hooks/apiHandler";
import RouteLoader from "@pages/loader/routeLoader";
import Error from "@pages/error/index";
import moment from "moment";
import millify from "millify";

export default function Maps() {
  const { isLoading, isError, error, data, refetch } = useGet("/countries");
  const worldBounds = new LatLngBounds(
    [-90, -180],
    [90, 180]
  );
  const renderMarkers = React.useMemo(() => {
    const renderPopUp = (obj: any) => {
      const tmp = { ...obj };
      delete tmp.updated;
      delete tmp.countryInfo;
      delete tmp.country;
      delete tmp.continent;
      return Object.keys(tmp).map((key) => (
        <li key={key} className="flex items-center justify-between">
          <strong className="capitalize">{`${key}`}</strong>
          <span className="text-xs">{millify(obj[key])}</span>
        </li>
      ));
    };
    return (
      data?.map((obj: any) => (
        <Marker
          key={obj.country}
          position={[obj.countryInfo.lat, obj.countryInfo.long]}
          icon={
            new Icon({
              iconUrl: obj.countryInfo.flag,
              className: "h-2 w-2 rounded",
            })
          }
        >
          <Popup>
            <div className="flex items-center gap-x-2 mb-2">
              <h2 className="font-bold text-xl">{obj.country}<span className="text-sm">{` (${obj.continent})`}</span></h2>
              <img
                src={obj.countryInfo.flag}
                alt=""
                className="h-4 w-6 rounded"
              />
            </div>
            <ul>{renderPopUp(obj)}</ul>
            <div className="text-right my-2 text-[8px]">
              {moment(obj.updated).format("dddd-MM-YYYY")}
            </div>
          </Popup>
        </Marker>
      )) || []
    );
  }, [data]);

  if (isLoading) {
    return <RouteLoader />;
  }

  if (isError) {
    return <Error error={error} refetch={refetch} />;
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <MapContainer
        maxBounds={worldBounds}
        center={[51.505, -0.09]}
        minZoom={3}
        zoom={3}
        scrollWheelZoom={true}
        worldCopyJump={!false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers}
      </MapContainer>
    </div>
  );
}
