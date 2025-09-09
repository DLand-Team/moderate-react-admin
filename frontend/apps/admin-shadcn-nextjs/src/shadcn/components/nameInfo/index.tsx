const NameInfo = () => {
  return (
    <div
      style={{
        display: "flex",
        fontSize: "25px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        alignItems: "center",
        position: "relative",
        marginLeft: "18px",
        top: "12px",
      }}
    >
      <img
        style={{
          width: "36px",
          height: "36px",
          marginRight: "5px",
          marginTop: "5px",
        }}
        src={"/logo.png"}
      ></img>
      Dland
    </div>
  );
};

export default NameInfo;
