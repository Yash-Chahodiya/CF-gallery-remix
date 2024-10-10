import { Select as AntdSelect, SelectProps } from "antd";
import React from "react";

export type ScrollAlign = "top" | "bottom" | "auto";

export interface BaseSelectRef {
  focus: () => void;
  blur: () => void;
  scrollTo: (
    arg:
      | number
      | {
          left?: number;
          top?: number;
        }
      | {
          index: number;
          align?: ScrollAlign;
          offset?: number;
        }
      | {
          key: React.Key;
          align?: ScrollAlign;
          offset?: number;
        }
  ) => void;
}

export const Select = React.forwardRef<BaseSelectRef, SelectProps>(
  (props, ref) => {
    return <AntdSelect {...props} ref={ref} />;
  }
);
