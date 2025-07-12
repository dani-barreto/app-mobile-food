import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    marginTop: 16,
    borderRadius: 8,
  },
  addressContainer: {
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 8,
  marginTop: 10,
  elevation: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  menuItemselect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  menuItemLeft: {
    marginRight: 12,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  menuItemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#2E24F4FF',
    fontWeight: 'bold',
  },
  ButtomTitleBlack: {
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 15,
      color: '#fff',
      alignItems: 'center',
      borderRadius: 8
  },
  ButtomWhite: {
        width: '100%',
        borderColor: '#000',
        backgroundColor: '#fff',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 8,
        borderWidth: 2
  },
  ButtomTitleWhite: {
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 15,
      display: 'flex',
      color: '#000',
      borderColor: '#000'
  },
  TextPadding:{
    display: 'flex',
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
},
});



