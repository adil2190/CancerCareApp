import React from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {hamburger} from '../assets/assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function DashboardHeader({label, onPressed, icon, count, onActionPressed}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressed}>
        <Image source={hamburger} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text style={styles.txt}> {label} </Text>
        {icon && (
          <TouchableOpacity
            onPress={onActionPressed}
            style={{position: 'relative'}}>
            <Image source={icon} style={styles.img} />
            <View style={styles.notificationCount}>
              <Text style={styles.notificationTxt}>{count}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: '100%',
    backgroundColor: colors.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
  },

  wrapper: {
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationCount: {
    height: 13,
    width: 13,
    position: 'absolute',
    top: 0,
    right: 13,
    backgroundColor: 'red',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationTxt: {
    color: '#fff',
    fontSize: 8,
  },
  img: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  txt: {
    marginTop: 5,
    color: colors.MAIN,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('3%'),
  },
});
export default DashboardHeader;
