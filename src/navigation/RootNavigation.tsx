import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '@/screens/Home';
import RepoDetail from '@/screens/RepoDetail';
import IssueDetail from '@/screens/IssueDetail';

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RepoDetail" component={RepoDetail} />
      <Stack.Screen name="IssueDetail" component={IssueDetail} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
