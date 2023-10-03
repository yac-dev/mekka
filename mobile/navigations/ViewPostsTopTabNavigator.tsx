import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';

const Tab = createMaterialTopTabNavigator();

const ViewPostsTopTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={({ route }) => ({
        lazy: true,
        swipeEnabled: false,
        animationEnabled: false,
        height: 0,
        backgroundColor: 'transparent',
      })}
    >
      <Tab.Screen name='TagsTopTabNavigator' component={TagsTopTabNavigator} />
      <Tab.Screen name='LocationsViewTopTabNavigator' component={LocationsViewTopTabNavigator} />
      <Tab.Screen name='PeopleViewTopTabNavigator' component={PeopleViewTopTabNavigator} />
    </Tab.Navigator>
  );
};

export default ViewPostsTopTabNavigator;
