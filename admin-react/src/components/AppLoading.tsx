const AppLoading = () => {
  return (
    <>
      <div
        className="text-center"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 className="mb-4 ms-2 text-primary">‎Voter List App</h2>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-4 ms-2 text-primary">Loading...</h5>
      </div>
    </>
  );
};

export default AppLoading;
