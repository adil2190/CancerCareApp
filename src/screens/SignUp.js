import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputField from '../components/InputField';
import {username, password, logo, back} from '../assets/assets';
import {colors} from '../constants/colors';
import MyButton from '../components/MyButton';
import BackHeader from '../components/BackHeader';

function SignUp({navigation}) {
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={back} style={styles.img} />
          </TouchableOpacity>
        </View>
        <Image source={logo} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Create Account</Text>
        </View>

        <View style={styles.parentContainer}>
          <View style={styles.childContainter}>
            <View style={styles.halfWidth}>
              <InputField
                icon={username}
                placeholder="First Name"
                placeholderTextColor={colors.LIGHTGRAY}
                fullWidth={true}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                icon={username}
                placeholder="Last Name"
                placeholderTextColor={colors.LIGHTGRAY}
                fullWidth={true}
              />
            </View>
          </View>
        </View>
        <InputField
          icon={username}
          placeholder="Email"
          placeholderTextColor={colors.LIGHTGRAY}
        />
        <InputField
          icon={password}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.LIGHTGRAY}
        />
        <MyButton buttonStyle={{marginVertical: hp('2.8%')}} label="Log in" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    marginTop: hp('2%'),
    height: hp('18%'),
    width: hp('18%'),
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: hp('7%'),
    marginBottom: hp('5%'),
    alignItems: 'center',
  },
  parentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  childContainter: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  boldText: {
    color: colors.MAIN,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('5%'),
  },

  subText: {
    marginTop: -13,
    color: colors.DARK,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
});
export default SignUp;
