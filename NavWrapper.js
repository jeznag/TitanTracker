import React, {Component} from 'react';
import TrackScreen from './components/Track';
import HabitPacksScreen from './components/HabitPacks';

const Routes = {
  Track: TrackScreen,
  HabitPacks: HabitPacksScreen,
};

export default class NavWrapper extends Component {
  constructor() {
    super();
    this.handleChangeRoute = this.handleChangeRoute.bind(this);
  }

  handleChangeRoute(newRoute) {
    this.setState({
      currentRoute: newRoute
    });
  }

  render() {
    const ComponentToRender = this.state ? Routes[this.state.currentRoute] : TrackScreen;
    const handleChangeRoute = this.handleChangeRoute;
    const navigation = {
      navigate(newRoute) {
        handleChangeRoute(newRoute);
      }
    };
    return (
      <ComponentToRender navigation={navigation} />
    );
  }
}
