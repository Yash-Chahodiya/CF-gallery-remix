import React from "react";
import NoDataFound from "~/components/NoDataFound";

export interface FetchDataListViewContainer {
  overflow: boolean;
  children: React.ReactNode;
  noDataFound: boolean;
}

interface FetchDataListViewProps<TData> {
  loading: boolean;
  data?: TData[];
  loaderComponent: React.ReactNode;
  mapFunction: (data: TData, key: number) => React.ReactNode;
  container: (props: FetchDataListViewContainer) => React.ReactNode;
}

function FetchDataListView<TData>({
  loading,
  data = [],
  loaderComponent,
  mapFunction,
  container,
}: FetchDataListViewProps<TData>) {
  const hasData = data.length > 0;
  return container({
    overflow: Boolean(hasData || loading),
    children: hasData ? (
      data.map(mapFunction)
    ) : loading ? (
      loaderComponent
    ) : (
      <NoDataFound />
    ),
    noDataFound: !hasData && !loading,
  });
}

export default FetchDataListView;
