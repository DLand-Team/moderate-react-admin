"use client";

import { RouteItem } from "src/router";

const View = ({ tree, list }: { tree: RouteItem; list: RouteItem[] }) => {
  return (
    <div>
      <h2>Tree Structure</h2>
      <pre>{JSON.stringify(tree, null, 2)}</pre>
      <h2>Flat List</h2>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};

export default View;
