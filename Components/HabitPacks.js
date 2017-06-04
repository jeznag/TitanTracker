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

const habitPacks = [
  {
    packTitle: 'Twelve Step habits',
    packID: 'f81c225f-21fa-4bb3-8e70-e00b87f2f3f1',
    habits: [
      {
        habitID: '2342b86f-dc61-45aa-bb52-c9bfed890d1e',
        habitName: 'Meditate',
        type: 'number',
        units: 'minutes',
        maxScore: 30,
        valueForMaxScore: 30,
        timeBlock: 'morning',
      },
      {
        habitID: '64abe7dd-22f6-4e54-ad2d-c86ece2569d8',
        habitName: 'Do written step 10',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
      {
        habitID: '6ad621ff-7b23-4634-b53c-461e9ed3b9fe',
        habitName: 'Sponsor call',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
      {
        habitID: '111bfaa9-6ea2-42c4-969c-92683e74c1a2',
        habitName: 'Morning outreach call',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
      {
        habitID: 'd404e015-6e65-497e-b86c-a6187dc00fe7',
        habitName: 'Afternoon outreach call',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'afternoon',
      },
      {
        habitID: 'd4ac852c-682f-4db1-bea1-31f6bf1cfde0',
        habitName: 'Morning pages',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
      {
        habitID: 'b907ab32-0de3-4c84-b547-69662003658f',
        habitName: 'Evening outreach call',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
      {
        habitID: '3d5088c6-fc9e-46b2-ba8a-e3488108f859',
        habitName: 'Write gratitude list',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
      {
        habitID: 'f1016584-5c97-45eb-9b63-845bbe6ffdc2',
        habitName: 'Get down on knees and pray for sober day',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
      {
        habitID: '9e1fbfd8-dbcb-4a19-a353-78d2d64782b0',
        habitName: 'Get down on knees and thank God for sober day',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
    ],
  },
  {
    packTitle: 'Be clean and tidy',
    packID: '71171f47-b709-4836-8606-cd81d83092b7',
    habits: [
      {
        habitID: 'caccf859-501e-4965-b450-655abd9a3546',
        habitName: 'Make bed',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
      {
        habitID: 'cd495199-9aa7-4d7c-ace0-027ab83e1d1a',
        habitName: 'Do all dishes',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
      {
        habitID: '0022277a-9e42-4033-991f-7d5a963d2d12',
        habitName: 'Put all clothes away',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'evening',
      },
    ],
  },
  {
    packID: '09c3a2cb-4709-44cf-bc55-207d9f21a84a',
    packTitle: 'Fitness',
    habits: [
      {
        habitID: '420b97a6-ef42-4bb8-b49f-5e686c91c118',
        habitName: 'Do 10k steps',
        type: 'number',
        maxScore: 10,
        valueForMaxScore: 10000,
        timeBlock: 'evening',
      },
      {
        habitID: 'c60d740f-05ae-4da1-a76c-056b40b53580',
        habitName: 'Do yoga practice',
        type: 'boolean',
        maxScore: 10,
        valueForMaxScore: true,
        timeBlock: 'morning',
      },
    ],
  },
];

class HabitPacksScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Get more habits
        </Text>
        {habitPacks.map(habitPack => (
          <Button
            onPress={() => this.props.handleAddHabitPack(habitPack)}
            title={habitPack.packTitle}
            key={habitPack.packID}
            disabled={!!this.props.habitPackData.find((habitPackWeAlreadyHave) => habitPackWeAlreadyHave.packID === habitPack.packID)}
          />
        ))}
        <Button
          onPress={() => navigate('Track')}
          title="Start Tracking Again"
          style={styles.track}
        />
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
    loading: state.asyncInitialState.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitPacksScreen);
