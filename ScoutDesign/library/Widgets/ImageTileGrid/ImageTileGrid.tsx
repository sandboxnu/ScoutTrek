import { Dimensions } from 'react-native';
import Image, { ImageProps } from '../../Atoms/UI/Assets/Image/Image';
import { Box, PressableProps, Spacing } from '../../Atoms/utility';

export type TileProps = Omit<ImageProps, 'size'> & {
  id: string;
};

interface ImageTileGridProps {
  rows: number;
  padding: Spacing;
  tiles: TileProps[];
  everyItemProps?: PressableProps;
}

const mapToSmallerSpacing: { [key: string]: Spacing | undefined } = {
  micro: undefined,
  xs: 'micro',
  s: 'xs',
  m: 's',
  l: 'm',
  xl: 'l',
  xxl: 'xl',
};

const ImageTileGrid = ({
  rows,
  padding,
  tiles,
  everyItemProps,
}: ImageTileGridProps) => {
  const calculatePadding = (
    index: number,
    side: 'top' | 'right' | 'bottom' | 'left'
  ): Spacing | undefined => {
    if (index >= rows) {
      if (side === 'top') {
        return mapToSmallerSpacing[padding];
      }
    }
    if (index <= tiles.length - rows + 1) {
      if (side === 'bottom') {
        return mapToSmallerSpacing[padding];
      }
    }
    if ((index + 1) % rows !== 0) {
      if (side === 'right') {
        return mapToSmallerSpacing[padding];
      }
    }
    if (index % rows !== 0) {
      if (side === 'left') {
        return mapToSmallerSpacing[padding];
      }
    }
    return undefined;
  };

  const size = Dimensions.get('window').width / rows;

  return (
    <Box flexDirection="row" flexWrap="wrap" alignItems="center">
      {tiles.map((imageProps, index) => {
        return (
          <Box
            key={imageProps.id}
            width={size}
            height={size}
            padding={padding}
            paddingLeft={calculatePadding(index, 'left')}
            paddingRight={calculatePadding(index, 'right')}
            paddingTop={calculatePadding(index, 'top')}
            paddingBottom={calculatePadding(index, 'bottom')}
          >
            <Image {...everyItemProps} {...imageProps} size="fill" />
          </Box>
        );
      })}
    </Box>
  );
};

export default ImageTileGrid;
