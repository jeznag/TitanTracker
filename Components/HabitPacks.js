import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import {connect} from 'react-redux';
import HabitActionCreator from '../redux/action-creators/habit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  track: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class HabitPacksScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    if (this.props.loading) {
      return (<Text>Loading...</Text>);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Get more habits
        </Text>
        {this.props.availableHabitPacks.map(habitPack => (
          <Button
            onPress={() => this.props.handleAddHabitPack(habitPack)}
            title={habitPack.packTitle}
            key={habitPack.packID}
            disabled={!!this.props.installedHabitPacks.find((habitPackWeAlreadyHave) => habitPackWeAlreadyHave.packID === habitPack.packID)}
          />
        ))}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddHabitPack(habitPack) {
      dispatch(HabitActionCreator.addHabitPack(habitPack));
    },
  };
};

const mapStateToProps = state => {
  return {
    habitPackData: state.habitPackData,
    availableHabitPacks: state.habitPackData.availableHabitPacks,
    installedHabitPacks: state.habitPackData.installedHabitPacks,
    loading: state.asyncInitialState.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitPacksScreen);
