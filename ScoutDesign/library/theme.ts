import { FlexAlignType } from 'react-native';
import { createTheme } from '@shopify/restyle';

const palette = {
  saffronYellow: '#F4C006',
  jonquilYellow: '#F5D03D',
  crayolaYellow: '#FFEB99',
  darkOrange: '#E98D01',
  orangePeel: '#FDA521',
  lightPeach: '#FFDCAD',
  darkRed: '#C72B23',
  mediumRed: '#DF5349',
  mauvelous: '#EF9FAA',
  airforceBlue: '#16559C',
  brightNavy: '#1F74D6',
  tuftsBlue: '#4C94E6',
  darkOliveBrown: '#48390A',
  drabBrown: '#7D6012',
  lemonCurryBrown: '#C9A326',
  darkGreen: '#288555',
  mediumGreen: '#34A86C',
  aquamarine: '#74E7AA',
  teaGreen: '#DBFBDF',
  greenGlow: '#F4FBF4',

  black: '#191710',

  darkGrey: '#3D444D',
  slateGrey: '#738487',
  morningGrey: '#90A7A5',
  mediumGrey: '#B3CCC8',
  mintGrey: '#DBE6E1',
  lightMintGrey: '#F4F6F5',
  lightRedGrey: '#F7F0F0',

  offWhite: '#F8FCFA',
  white: '#FFFFFF',
};

type Alignments = {
  left: FlexAlignType;
  center: FlexAlignType;
  right: FlexAlignType;
};

const alignments: Alignments = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

type Borders = {
  simple: {
    borderColor: String;
    borderWidth: String;
  };
};

const borders: Borders = {
  simple: {
    borderColor: 'black',
    borderWidth: '2',
  },
};

const theme = createTheme({
  colors: {
    brandPrimaryLight: palette.aquamarine,
    brandPrimary: palette.mediumGreen,
    brandPrimaryDark: palette.darkGreen,

    informationLight: palette.lemonCurryBrown,
    information: palette.drabBrown,
    informationDark: palette.darkOliveBrown,

    brandSecondaryLight: palette.lightPeach,
    brandSecondary: palette.orangePeel,
    brandSecondaryDark: palette.darkOrange,

    interactiveLight: palette.tuftsBlue,
    interactive: palette.brightNavy,
    interactiveDark: palette.airforceBlue,

    dangerLight: palette.mauvelous,
    danger: palette.mediumRed,
    dangerDark: palette.darkRed,

    urgentLight: palette.crayolaYellow,
    urgent: palette.jonquilYellow,
    urgentDark: palette.saffronYellow,

    black: palette.black,

    darkGrey: palette.darkGrey,
    slateGrey: palette.slateGrey,
    mediumGrey: palette.mediumGrey,
    morningGrey: palette.morningGrey,
    mintGrey: palette.mintGrey,
    lightMintGrey: palette.lightMintGrey,
    lightRedGrey: palette.lightRedGrey,

    offWhite: palette.offWhite,
    white: palette.white,
  },
  spacing: {
    none: 0,
    micro: 2,
    xs: 4,
    icon: 6,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 96,
  },
  alignments,
  borders,
  radii: {
    micro: 1,
    xs: 2,
    s: 4,
    m: 7,
    l: 14,
    xl: 25,
  },
  assetSizes: {
    micro: 9,
    xs: 16,
    s: 21,
    m: 24,
    l: 30,
    xl: 140,
    fill: '100%',
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    h1: {
      fontSize: 28,
      lineHeight: 40,
      fontFamily: 'metropolis-black',
      fontWeight: '900',
    },
    h2: {
      fontSize: 26,
      lineHeight: 34,
      fontFamily: 'metropolis-bold',
      fontWeight: '800',
    },
    h3: {
      fontSize: 23,
      fontFamily: 'metropolis-bold',
      fontWeight: '800',
    },
    subheading: {
      fontSize: 19.5,
      lineHeight: 24,
      fontFamily: 'metropolis-regular',
    },
    button: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'open-sans-bold',
      fontWeight: '600',
    },
    micro: {
      fontSize: 13,
      lineHeight: 13,
      fontFamily: 'metropolis-bold',
    },

    label: {
      fontSize: 21,
      lineHeight: 27,
      fontFamily: 'metropolis-medium',
      fontWeight: '500',
    },
    'label-light': {
      fontSize: 21,
      lineHeight: 27,
      fontFamily: 'metropolis-light',
      fontWeight: '300',
    },

    sublabel: {
      fontSize: 16,
      lineHeight: 18,
      fontFamily: 'metropolis-medium',
      fontWeight: '500',
    },
    'sublabel-light': {
      fontSize: 16,
      lineHeight: 18,
      fontFamily: 'metropolis-light',
      fontWeight: '300',
    },

    'l-bold': {
      fontSize: 20,
      lineHeight: 26,
      fontFamily: 'open-sans-bold',
      fontWeight: 'bold',
    },
    'l-regular': {
      fontSize: 20,
      fontFamily: 'open-sans-regular',
    },
    'l-light': {
      fontSize: 20,
      fontFamily: 'open-sans-light',
      fontWeight: '300',
    },

    'm-bold': {
      fontSize: 17,
      fontFamily: 'open-sans-bold',
      fontWeight: 'bold',
    },
    'm-regular': {
      fontSize: 17,
      fontFamily: 'open-sans-regular',
    },
    'm-light': {
      fontSize: 17,
      fontFamily: 'open-sans-light',
      fontWeight: '300',
    },

    's-bold': {
      fontSize: 15,
      fontFamily: 'open-sans-bold',
      fontWeight: 'bold',
    },
    's-regular': {
      fontSize: 15,
      fontFamily: 'open-sans-regular',
    },
    's-light': {
      fontSize: 15,
      fontFamily: 'open-sans-light',
      fontWeight: '300',
    },
  },
});

export type Theme = typeof theme;
export default theme;
