const Loader = () => {
  return (
    <div className="d-flex justify-content-center p-5">
      <div
        className="spinner-border text-secondary"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      ></div>
    </div>
  );
};

export default Loader;
