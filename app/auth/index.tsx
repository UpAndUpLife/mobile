import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

export default function AuthPage() {

  return (
    <View className="flex w-full h-full items-center justify-between bg-white"> 

        <View className="flex-1 w-full items-center justify-center" >
         <LottieView source={require("../../assets/vectors/authScreen.json")} className="w-1/2 h-1/2" autoPlay loop={false}/>
        </View>
        <View className="h-1/3 items-center">
            <Text className="text-lg font-bold text-gray-800">UpLife Wallet</Text>
            <Text className="text-sm font-light text-gray-600">You'r ratings are your's</Text>
        </View>    
        <View className="h-1/5 w-full pl-3 pr-3">
            <Button mode="contained" onPress={() => {router.push("/auth/signup")}} className="rounded-lg bg-blue-400 mb-2" >
                Create Wallet
            </Button> 

            <Button mode="outlined" onPress={() => {router.push("/auth/login")}} className="rounded-lg" theme={{colors: {primary: "#60a5fa"}}} >
                Login
            </Button>         
        </View>  
    </View>
  );
}