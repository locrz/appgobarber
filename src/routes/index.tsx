import React from 'react';
import {useAuth} from '../hooks/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {View, ActivityIndicator} from 'react-native';

const Routes: React.FC = () => {
  const {isSigned, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return isSigned ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
