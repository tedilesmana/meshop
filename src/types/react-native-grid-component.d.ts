// src/@types/react-native-grid-component.d.ts

declare module 'react-native-grid-component' {
  import * as React from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  interface GridProps {
    data: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
    numColumns: number;
    keyExtractor?: (item: any, index: number) => string;
    itemDimension?: number;
    spacing?: number;
    style?: StyleProp<ViewStyle>;
  }

  export default class Grid extends React.Component<GridProps> {}
}
