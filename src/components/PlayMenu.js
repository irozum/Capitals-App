import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'

Icon.loadFont()
Icon1.loadFont()
Icon2.loadFont()

export default function ContinentSelect({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.goBack()}>

      <View style={[styles.container, styles.center]}>
        <View>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            style={styles.menuButtons}>
            <Icon name="right" size={30} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.pop(2)}
            style={styles.menuButtons}>
            <Icon1 name="md-exit" size={30} color="white" />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
    paddingHorizontal: '5%',
    justifyContent: 'center'
  },
  menuButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center'
  },
})