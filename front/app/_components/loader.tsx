type Props = {
  size: number;
};

const Loader = ({ size }: Props) => {
  return (
    <div
      className="spinner-border text-secondary"
      style={{ width: `${size}rem`, height: `${size}rem` }}
      role="status"
    ></div>
  );
};

export default Loader;
