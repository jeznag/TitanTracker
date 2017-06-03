// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   Button,
//   View,
//   ListView
// } from 'react-native';
// // import { DataGrid } from 'react-native-data-grid';
//
// const fields = [
//   {
//     'name': 'Habit',
//     'field': 'habitName'
//   },
//   {
//     'name': 'Type',
//     'field': 'type'
//   },
//   {
//     'name': 'Max Score',
//     'field': 'maxScore'
//   },
//   {
//     'name': 'Time Block',
//     'field': 'timeBlock'
//   },
// ];
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
//
// export default class HomeScreen extends Component {
//   getHabitList() {
//     return (<DataGrid fields={fields} defaultGridData={habitData}/>);
//   }
//
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           All habits
//         </Text>
//         {this.getHabitList()}
//       </View>
//     );
//   }
// }
