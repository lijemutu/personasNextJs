type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="mx-1 px-1">{children}</div>;
};

export default Container;
