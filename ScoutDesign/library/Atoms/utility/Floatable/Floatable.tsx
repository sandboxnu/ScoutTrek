import Box from '../Box/Box';

type Corner = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type DistanceFromCorner = 'l' | 's' | 'edge';

type Position = {
  top?: number;
  right?: number | string;
  bottom?: number;
  left?: number | string;
};

type PositionFromDistance = {
  l?: Position;
  s?: Position;
  edge?: Position;
};

type PositionObj = {
  'top-right': PositionFromDistance;
  'top-left': PositionFromDistance;
  'bottom-right': PositionFromDistance;
  'bottom-left': PositionFromDistance;
};

export interface FloatableProps {
  corner?: Corner;
  distanceFromCorner?: DistanceFromCorner;
}

const positions: PositionObj = {
  'top-right': {
    l: {
      top: 35,
      right: 25,
    },
    s: {
      top: 7,
      right: '2.5%',
    },
    edge: {
      top: -7,
      right: -7,
    },
  },
  'top-left': {
    l: {
      top: 35,
      left: 25,
    },
    s: {
      top: 7,
      left: '2.5%',
    },
    edge: {
      top: -7,
      left: -7,
    },
  },
  'bottom-right': {
    l: {
      bottom: 35,
      right: 25,
    },
    s: {
      bottom: 10,
      right: 14,
    },
    edge: {
      bottom: -7,
      right: -7,
    },
  },
  'bottom-left': {
    l: {
      bottom: 35,
      left: 25,
    },
    s: {
      bottom: 10,
      left: 14,
    },
    edge: {
      bottom: 0,
      left: 0,
    },
  },
};

type Props = FloatableProps & { children?: any };

const Float = ({ corner, distanceFromCorner, children, ...rest }: Props) => {
  if (corner && distanceFromCorner) {
    return (
      <Box
        position="absolute"
        zIndex={1000}
        {...positions[corner][distanceFromCorner]}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    return <Box {...rest}>{children}</Box>;
  }
};

export default Float;
