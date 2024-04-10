import { FC } from "react";

interface SmallCardHOCProps {
  SmallCard: FC;
  SmallCardAdmin: FC;
}

export const SmallCardHOC = (
  isAdmin: boolean,
  { SmallCard, SmallCardAdmin }: SmallCardHOCProps,
) => {
  const WrappedComponent = (props) => {
    if (isAdmin) {
      return <SmallCard {...props}></SmallCard>;
    } else {
      return <SmallCardAdmin {...props}></SmallCardAdmin>;
    }
  };

  return WrappedComponent;
};
