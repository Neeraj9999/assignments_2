import RouteLoader from "@pages/loader/routeLoader";
import Error from "@pages/error/index";
import { useGet } from "@utils/hooks/apiHandler";
import React, { useMemo } from "react";
import { Line } from "@ant-design/plots";
import millify from "millify";

export default function LineChart() {
  const { isLoading, isError, error, data, refetch } = useGet(
    "/historical/all?lastdays=all"
  );

  const config = useMemo(() => {
    let tmp = [] as any;
    if (data) {
      tmp = Object.keys(data).map((key1) => {
        return Object.keys(data[key1]).map((key2) => ({
          name: key1,
          year: key2,
          count: data[key1][key2],
        }));
      });
    }
    return {
      data: tmp.flat(1),
      xField: "year",
      yField: "count",
      seriesField: "name",
      yAxis: {
        min: 0,
        label: {
          formatter: (v: string) => millify(+v),
        },
      },
      xAxis: {
        min: 0,
      },
      legend: {
        position: "bottom",
      },
      smooth: true,
      animation: {
        appear: {
          animation: "path-in",
          duration: 5000,
        },
      },
    };
  }, [data]);
  if (isLoading) {
    return <RouteLoader />;
  }

  if (isError) {
    return <Error error={error} refetch={refetch} />;
  }

  return (
    <div className=" p-2 h-full w-full overflow-auto">
      <Line {...(config as any)} />
    </div>
  );
}
