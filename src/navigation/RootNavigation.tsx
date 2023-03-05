import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/screens/Home';
import Search from '@/screens/Search';
import RepoDetail from '@/screens/RepoDetail';
import IssueDetail from '@/screens/IssueDetail';

import { Repository, Issue } from '@/types';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  RepoDetail: {
    item:
      | Repository
      | { node_id?: Repository['node_id']; name: Repository['name']; owner: { login: Repository['owner']['login'] } };
  };
  IssueDetail: { htmlUrl: Issue['html_url']; repositoryUrl: Issue['repository_url'] };
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="RepoDetail" component={RepoDetail} />
      <Stack.Screen name="IssueDetail" component={IssueDetail} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
