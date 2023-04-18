export const customStyles = {
  control: (styles) => ({
    ...styles,
    borderRadius: '50px'
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 2,
    borderRadius: 10,
    paddingBottom: 0,
    overflowX: 'hidden'
  }),
  option: (styles) => {
    return {
      ...styles,
      color: styles.backgroundColor === '#333' ? 'white' : 'black',
      padding: '15px 0',
      cursor: 'pointer',
      transition: 'all .15s linear',
      ':first-child': {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
      },
      ':last-child': {
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
      },
      ':focus': {
        color: 'white'
      },
      ':active': {
        ...styles[':active'],
        color: 'white',
        backgroundColor: '#333'
      },
      ':hover': {
        color: 'white'
      }
    };
  }
};

export const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#333',
      primary: '#333'
    }
  };
};
