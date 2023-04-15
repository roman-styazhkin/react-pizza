import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="279" rx="5" ry="5" width="280" height="23" />
    <rect x="0" y="326" rx="5" ry="5" width="280" height="88" />
    <rect x="0" y="436" rx="5" ry="5" width="105" height="30" />
    <rect x="125" y="430" rx="20" ry="20" width="152" height="40" />
  </ContentLoader>
);

export default Skeleton;
