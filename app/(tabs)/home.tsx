import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { View } from '@/components/Themed';
import { useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { createWallet } from '@/api/login';
import { useToast } from 'react-native-toast-notifications';

export default function Signup() {

  
  return (
    <View className="flex w-full h-full items-center"> 

      <Text variant='displaySmall' className="m-10">Home Page</Text>
    </View>
  );
}
