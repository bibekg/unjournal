import colors from './colors'

const themes = {
  light: {
    navbar: {
      background: 'transparent',
      text: colors.white,
    },
    landing: {
      background: colors.green,
      text: colors.white,
    },
    editor: {
      background: colors.cream,
      text: colors.grey,
      placeholderText: colors.lightGray,
    },
  },
  dark: {
    navbar: {
      background: 'transparent',
      text: colors.white,
    },
    landing: {
      background: colors.black,
      text: colors.white,
    },
    editor: {
      background: colors.black,
      text: colors.lightGray,
      placeholderText: colors.lightGray,
    },
  },
}

export default themes
