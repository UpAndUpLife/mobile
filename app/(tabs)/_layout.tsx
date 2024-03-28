import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { Pressable, View } from 'react-native';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const prefix = Linking.createURL('/');


const RootLayout = () => {

  const linking = {
    prefixes: [prefix],
  }

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer screenOptions={{
      headerTitleAlign: "center"
    }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Up & Up Life',
          headerStyle: {
            backgroundColor: '#1e9ef4',  
           },
           headerTintColor: "#fff",
           headerTitleStyle: {
            fontWeight: 'bold',
           },

           headerRight: ()=> {
            return (
              <Pressable onPress={async () => {
                await AsyncStorage.removeItem("authToken")
                router.navigate("/")
              }}>
              <View className="bg-red-500 w-min mr-2 rounded-full border border-gray-700">
                <Avatar.Image size={32} source={require('../../assets/images/user_prof_1.jpg')} />
              </View>
              </Pressable>
            )
          }

        }}
      />
      
    </Drawer>
    </GestureHandlerRootView>


  
  )
}


export default RootLayout;