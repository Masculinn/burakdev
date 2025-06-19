import React from "react";

export default function countChildren(child: any): number {
  let count = 0;

  if (child && child.props && child.props.children) {
    if (React.Children.count(child.props.children) > 0) {
      React.Children.forEach(child.props.children, (subChild) => {
        count += countChildren(subChild);
      });
    } else {
      count = 1;
    }
  } else {
    count = 1;
  }

  return count;
}
