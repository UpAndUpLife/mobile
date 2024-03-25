import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { View } from 'react-native';


const RootLayout = () => {

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
              <View className="bg-red-500 w-min mr-2 rounded-full border border-gray-700">
                <Avatar.Image size={32} source={require('../../assets/images/user_prof_1.jpg')} />
              </View>
            )
          }

        }}
      />
      
    </Drawer>
    </GestureHandlerRootView>


  
  )
}


export default RootLayout;