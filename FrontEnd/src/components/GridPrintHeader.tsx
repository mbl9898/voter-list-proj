const GridPrintHeader = ({ uniqueBlockcodes }: any) => {
  return (
    <div
      className="m-3"
      style={{
        boxShadow: "0 1px 6px rgba(0,0,0,0.3)",
        borderRadius: "0.25rem",
        padding: "1rem"
      }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="/logo192.jpeg"
          alt="Bait Ul Ilm Logo"
          width="50"
          height="50"
        />
        <h2 className="text-center text-primary mt-4">Final Voter List</h2>
      </div>
      <div className="d-flex justify-content-between">
        <h5>
          Constituency Name:
          <span style={{ textDecoration: "underline" }}>
            {" "}
            (DHA-PH-2)17-Humak
          </span>
        </h5>
        <h5>
          Moza/Dehya/City:
          <span style={{ textDecoration: "underline" }}> Humak</span>
        </h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5>
          Union Council:
          <span style={{ textDecoration: "underline" }}>
            &nbsp; N/A &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;
          </span>
        </h5>
        <h5>
          Patwar Halka/Tapaydar:
          <span style={{ textDecoration: "underline" }}> Humak</span>
        </h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5>
          Tehseel/Talka:
          <span style={{ textDecoration: "underline" }}> Islamabad</span>
        </h5>
        <h5>
          District:
          <span style={{ textDecoration: "underline" }}> Islamabad</span>
        </h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5>
          Block Code:
          <span style={{ textDecoration: "underline" }}>
            {uniqueBlockcodes.map((blockcode: any, i: any) => {
              return (
                <span key={i}>
                  {blockcode}
                  {uniqueBlockcodes.length > 1
                    ? uniqueBlockcodes.length !== i + 1
                      ? ", "
                      : ""
                    : ""}
                </span>
              );
            })}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default GridPrintHeader;
