const NoDataFound = ({ nodataFound }: any) => {
  return <div className="text-xl "> {nodataFound && <p>no data found</p>}</div>;
};

export default NoDataFound;
